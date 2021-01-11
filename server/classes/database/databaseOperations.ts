import Questions from "../questions/questions";
import User from "../users/User";

const { MongoClient, ObjectID } = require("mongodb");

class DatabaseOperations {
  private databaseClient: any;
  private readonly connectionString: string | undefined;

  constructor() {
    this.connectionString = process.env.DATABASEURL;
    this.databaseClient = new MongoClient(this.connectionString, {
      useUnifiedTopology: true,
    });
  }

  public async initiateConnection() {
    return this.databaseClient.connect();
  }

  public async deleteResults(email: string, id: string): Promise<any> {
    const idToMatch = ObjectID(id);
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.USERSCOLLECTION)
        .updateOne({ email: email }, { $pull: { results: { id: idToMatch } } });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong with the database Results Query");
    }
  }

  public async getResultProperty(email: string): Promise<any> {
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.USERSCOLLECTION)
        .findOne({ email }, { projection: { results: 1 } });
    } catch (e) {
      throw new Error("Something went wrong with the database Results Query");
    }
  }

  public async insertUserToDatabase(user: User): Promise<any> {
    try {
      const operation = await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.USERSCOLLECTION)
        .insertOne(user);
      return operation;
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong with database Insert.");
    }
  }

  public async handleAcceptOrDeclineInvite(
    userEmail: string,
    inviteUser: any,
    accepted: boolean
  ) {
    try {
      const bulk = this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.USERSCOLLECTION)
        .initializeUnorderedBulkOp();
      if (accepted) {
        bulk
          .find({ email: userEmail })
          .updateOne({ $pull: { invites: inviteUser.email } });
        bulk
          .find({ email: userEmail })
          .updateOne({ $set: { licenceId: inviteUser.licenceId } });
        return bulk.execute();
      }

      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.USERSCOLLECTION)
        .updateOne(
          { email: userEmail },
          { $pull: { invites: inviteUser["email"] } }
        );
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with the Query.");
    }
  }

  public async saveResultsToDB(userEmail: string, results: any) {
    const resultId = ObjectID();
    results.id = resultId;
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.USERSCOLLECTION)
        .updateOne(
          { email: userEmail },
          {
            $push: {
              results: results,
            },
          }
        );
    } catch (e) {
      throw new Error("Something went wrong with saving results.");
    }
  }

  public async sendInviteToUser(
    user: any,
    recevingEmail: string
  ): Promise<any> {
    try {
      await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.USERSCOLLECTION)
        .updateOne(
          { email: user.email },
          { $push: { invites: recevingEmail } }
        );
    } catch (error) {
      throw new Error("Something went wrong with DatabaseOperations Query.");
    }
  }

  public async queryUserByEmailDatabase(value: string): Promise<any> {
    try {
      const operation = await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.USERSCOLLECTION)
        .findOne({ email: value }, { projection: { _id: 0 } });
      return operation;
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong with DatabaseOperations Query.");
    }
  }

  public async insertQuestionsIntoDatabase(
    questions: Questions,
    licenceId: string
  ): Promise<any> {
    const bulk = this.databaseClient
      .db(process.env.DATABASENAME)
      .collection(process.env.QUESTIONSCOLLECTION)
      .initializeUnorderedBulkOp();
    try {
      questions.questionsData.forEach((question: any) => {
        bulk.insert({
          name: question.name,
          areaName: question.areaName,
          subjectName: question.subjectName,
          category: question.category,
          //explanation: question.explanation,
          groupName: question.groupName,
          groupId: question.groupId,
          options: question.options,
          licenceGroup: licenceId,
          answered: question.answered,
          answeredCorrectly: question.answeredCorrectly,
          tags: question.tags,
        });
      });
      return bulk.execute();
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong with DatabaseQueries Query");
    }
  }

  public async gatherQuestionsByLicence(value: string) {
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .find({ licenceGroup: value });
    } catch (e) {
      throw new Error("Something went wrong with Gathering Questions Query");
    }
  }

  public async gatherGroupIdByGroupName(groupName: string) {
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .findOne(
          { groupName: groupName },
          { projection: { groupId: 1, _id: 0 } }
        );
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong with Gathering Questions Query");
    }
  }

  public async gatherQuestionsByCategory(
    category: string | number,
    licenceId: string,
    subjectChosen: string
  ) {
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .distinct("groupName", {
          category: category,
          licenceGroup: licenceId,
          subjectName: subjectChosen,
        });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong with Gathering Questions Query");
    }
  }

  public async gatherQuestionById(id: string) {
    const idToFilterBy = ObjectID(id);
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .findOne({ _id: idToFilterBy });
    } catch (e) {
      throw new Error("Something went wrong with Gathering the question.");
    }
  }

  public async deleteQuestion(questionId: string) {
    const idToFilterBy = ObjectID(questionId);
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .deleteOne({ _id: idToFilterBy });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong with deleting the question");
    }
  }

  public async updateQuestion(questionId: string, newData: any) {
    const idToFilterBy = ObjectID(questionId);
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .updateOne(
          { _id: idToFilterBy },
          {
            $set: {
              name: newData.name,
              category: newData.category,
              options: newData.options,
            },
          }
        );
    } catch (e) {
      throw new Error("Something went wrong with Updateing the question.");
    }
  }

  public async gatherQuestionsByGroupName(value: string, licenceId: string) {
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .find({ groupName: value, licenceGroup: licenceId });
    } catch (e) {
      throw new Error("Something went wrong with Gathering Questions Query");
    }
  }

  public async gatherQuestionsByGroupId(id: string) {
    const idToFilterBy = ObjectID(id);

    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .find({ groupId: idToFilterBy });
    } catch (e) {
      throw new Error("Something went wrong with Gathering Questions Query");
    }
  }

  public async gatherAllAreasByLicence(licenceId: string) {
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .distinct("areaName", { licenceGroup: licenceId });
    } catch (e) {
      throw new Error("Something went wrong with Gethering categories query");
    }
  }

  public async gatherCategoriesBySubjectChosen(
    subjectChosen: string,
    licenceId: string
  ) {
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .distinct("category", {
          licenceGroup: licenceId,
          subjectName: subjectChosen,
        });
    } catch (e) {
      throw new Error("Something went wrong with gathering subjects query");
    }
  }

  public async gatherSubjectsByAreaChosen(
    areaChosen: string,
    licenceId: string
  ) {
    try {
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .distinct("subjectName", {
          licenceGroup: licenceId,
          areaName: areaChosen,
        });
    } catch (e) {
      throw new Error("Something went wrong with gathering subjects query");
    }
  }

  public async gatherAllCategories() {
    try {
      const projection = { category: 1, _id: 0 };
      return await this.databaseClient
        .db(process.env.DATABASENAME)
        .collection(process.env.QUESTIONSCOLLECTION)
        .find()
        .project(projection);
    } catch (e) {
      throw new Error("Something went wrong with Gathering qustions Query");
    }
  }

  public async terminateConnection() {
    return this.databaseClient.close();
  }
}

export = DatabaseOperations;
