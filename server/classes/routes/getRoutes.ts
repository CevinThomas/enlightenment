import Results, { NewResults } from "../../interfaces/results";
import DatabaseOperations from "../database/databaseOperations";
import RouteResponseClass from "./routeResponseClass";

const url = require("url");

class GetRoutes {
  constructor() {}

  /*public static async getQuestionsByCategory(
    requestParams: any
  ): Promise<RouteResponse> {
    let categoryParam: any;
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      categoryParam = requestParams.category;
      //TODO: Validate query param input
      if (typeof categoryParam === "number")
        return new RouteResponseClass(
          200,
          "Was given a number, want string.",
          {}
        );

      const dbOperation = await database.gatherQuestionsByCategory(
        categoryParam
      );
      const questions = await dbOperation.toArray();
      if (questions.length === 0)
        return new RouteResponseClass(
          200,
          "No questions found with that query.",
          {}
        );
      return new RouteResponseClass(
        200,
        "Here are the requested Questions",
        questions
      );
    } catch (e) {
      console.log(e);
      return new RouteResponseClass(500, "Questions could not be gathered", {});
    } finally {
      await database.terminateConnection();
    }
  }*/

  public static async getCategoriesBySubject(
    userEmail: string,
    subject: string
  ) {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      if (typeof subject !== "string")
        return new RouteResponseClass(200, "Was not given a string.", {});

      const user = await database.queryUserByEmailDatabase(userEmail);
      if (!user) return new RouteResponseClass(203, "User not found", {});
      console.log(user.licenceId);

      const dbOperation = await database.gatherCategoriesBySubjectChosen(
        subject,
        user.licenceId
      );

      //TODO: Create a hash table with the groupName as key, and all questions under that as array

      return new RouteResponseClass(
        200,
        "Here are the requested Groups by Category, and their questions by category",
        {
          dbOperation,
        }
      );
    } catch {
      return new RouteResponseClass(500, "Questions could not be gathered", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getResults(email: string): Promise<RouteResponseClass> {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      const results = await database.getResultProperty(email);
      if (!results) {
        return new RouteResponseClass(203, "No results found", {});
      }
      const propertiesWeWant = results.results.map((results: Results) => {
        return {
          id: results.id,
          subjectName: results.subjectName,
          category: results.categories[0],
          groupName: results.groupName,
          individualQuestions: results.individualQuestions,
          areaName: results.areaName,
        };
      });
      let uniqueSubjectNames: Array<string> = [];
      let uniqueAreaNames: Array<string> = [];

      const uniqueAreaNameWithSubjects: Array<{
        areaName: string;
        subjects: Array<string>;
      }> = [];

      propertiesWeWant.forEach((result: NewResults) => {
        if (!uniqueAreaNames.includes(result.areaName)) {
          uniqueAreaNameWithSubjects.push({
            areaName: result.areaName,
            subjects: [result.subjectName],
          });
          uniqueAreaNames.push(result.areaName);
          uniqueSubjectNames.push(result.subjectName);
        }

        if (
          uniqueAreaNames.includes(result.areaName) &&
          !uniqueSubjectNames.includes(result.subjectName)
        ) {
          const elementToUpdate = uniqueAreaNameWithSubjects.find(
            (area) => area.areaName === result.areaName
          );
          elementToUpdate?.subjects.push(result.subjectName);
          uniqueSubjectNames.push(result.subjectName);
        }
      });

      return new RouteResponseClass(200, "Here is the results.", {
        results: propertiesWeWant,
        uniqueAreaAndSubjects: uniqueAreaNameWithSubjects,
      });
    } catch (e) {
      console.log(e);
      return new RouteResponseClass(500, "Results could not be gathered", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getQuestionById(
    questionId: string
  ): Promise<RouteResponseClass> {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      const question = await database.gatherQuestionById(questionId);
      if (!question)
        return new RouteResponseClass(204, "Could not find Question.", {});
      return new RouteResponseClass(200, "Here is the question.", question);
    } catch (e) {
      return new RouteResponseClass(500, "Question could not be gathered", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getQuestionsByGroupName(
    requestParams: any,
    userEmail: string
  ) {
    let groupNameParam: any;
    const database = new DatabaseOperations();
    await database.initiateConnection();

    //TODO: Validate GroupNameParam before initializing database connection

    groupNameParam = requestParams;

    const queryArray = groupNameParam.group.split("-");

    let firstWord = queryArray[0];
    const capitalizedFirstWord = firstWord.charAt(0) + firstWord.slice(1);
    queryArray[0] = capitalizedFirstWord;
    const rejoinedSentence = queryArray.join(" ");

    //TODO: VALIDATE GROUPNAMEPARAM

    try {
      const user = await database.queryUserByEmailDatabase(userEmail);

      if (!user) return new RouteResponseClass(203, "No user found.", {});

      const dbOperationOne = await database.gatherGroupIdByGroupName(
        rejoinedSentence
      );

      const dbOperation = await database.gatherQuestionsByGroupName(
        rejoinedSentence,
        user.licenceId
      );
      const questions = await dbOperation.toArray();
      if (questions.length === 0)
        return new RouteResponseClass(
          200,
          "No questions found with that query.",
          {}
        );
      return new RouteResponseClass(200, "Here are the requested Questions.", {
        questions: questions,
        groupId: dbOperationOne,
      });
    } catch (e) {
      console.log(e);
      return new RouteResponseClass(500, "Questions could not be gathered", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getInvites(email: string): Promise<RouteResponse> {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      const user = await database.queryUserByEmailDatabase(email);
      if (!user) return new RouteResponseClass(204, "User not found.", {});
      return new RouteResponseClass(200, "Here are the invites.", {
        invites: user.invites,
      });
    } catch (error) {
      return new RouteResponseClass(500, "Invites could not be gathered.", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getUserLicence(
    userEmail: string
  ): Promise<RouteResponse> {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      const user = await database.queryUserByEmailDatabase(userEmail);
      if (!user) return new RouteResponseClass(204, "User not found.", {});
      return new RouteResponseClass(200, "LicenceId", user.licenceId);
    } catch (e) {
      return new RouteResponseClass(
        500,
        "LicenceId could not be gathered.",
        {}
      );
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getQuestionsByLicence(requestParams: string) {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    const licenceParam = requestParams;

    //TODO: KEEP IT DRY WITH ABOVE ROUTE
    try {
      const dbOperation = await database.gatherQuestionsByLicence(licenceParam);
      const questions = await dbOperation.toArray();
      if (questions.length === 0)
        return new RouteResponseClass(
          200,
          "No questions found with that query.",
          {}
        );
      return new RouteResponseClass(
        200,
        "Here are the requested Questions",
        questions
      );
    } catch (e) {
      console.log(e);
      return new RouteResponseClass(500, "Questions could not be gathered", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getAreasByLicence(userEmail: string) {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      const user = await database.queryUserByEmailDatabase(userEmail);
      if (!user) return new RouteResponseClass(203, "User not found", {});
      const dbOperation = await database.gatherAllAreasByLicence(
        user.licenceId
      );
      return new RouteResponseClass(200, "Here are the categories", {
        dbOperation,
      });
    } catch {
      return new RouteResponseClass(
        500,
        "Categories could not be gathered",
        {}
      );
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getSubjectsByArea(areaChosen: string, userEmail: string) {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    console.log(areaChosen);
    try {
      if (typeof areaChosen !== "string")
        return new RouteResponseClass(200, "Was not given a string.", {});

      const user = await database.queryUserByEmailDatabase(userEmail);
      if (!user) return new RouteResponseClass(203, "User not found", {});

      const dbOperation = await database.gatherSubjectsByAreaChosen(
        areaChosen,
        user.licenceId
      );

      //TODO: Create a hash table with the groupName as key, and all questions under that as array

      return new RouteResponseClass(
        200,
        "Here are the requested Groups by Category, and their questions by category",
        {
          dbOperation,
        }
      );
    } catch {
      return new RouteResponseClass(500, "Questions could not be gathered", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getGroupsForCategory(
    requestParams: any,
    userEmail: string,
    subjectChosen: string
  ) {
    //TODO: Validate categoryParam before initializing database connection
    let categoryParam: any;
    const database = new DatabaseOperations();
    await database.initiateConnection();

    categoryParam = requestParams;
    try {
      if (typeof categoryParam !== "string")
        return new RouteResponseClass(200, "Was not given a string.", {});

      const user = await database.queryUserByEmailDatabase(userEmail);

      if (!user) return new RouteResponseClass(203, "User not found.", {});

      const dbOperation = await database.gatherQuestionsByCategory(
        categoryParam,
        user.licenceId,
        subjectChosen
      );

      //TODO: Create a hash table with the groupName as key, and all questions under that as array

      return new RouteResponseClass(
        200,
        "Here are the requested Groups by Category, and their questions by category",
        { dbOperation }
      );
    } catch (e) {
      console.log(e);
      return new RouteResponseClass(500, "Questions could not be gathered", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getQuestionsByGroupId(requestParams: any) {
    let groupIdParam: any;
    const database = new DatabaseOperations();
    await database.initiateConnection();

    groupIdParam = requestParams;

    try {
      const dbOperation = await database.gatherQuestionsByGroupId(groupIdParam);
      const questions = await dbOperation.toArray();
      return new RouteResponseClass(
        200,
        "Here are the requested Groups by Category, and their questions by group Id",
        questions
      );
    } catch (e) {
      return new RouteResponseClass(500, "Questions could not be gathered", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async getAllCategories() {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      const dbOperation = await database.gatherAllCategories();
      const categories = await dbOperation.toArray();

      let uniqueCategories: Array<any> = [];
      for (let i = 0; i < categories.length; i++) {
        if (uniqueCategories.includes(categories[i].category)) {
        } else {
          uniqueCategories.push(categories[i].category);
        }
      }
      //TODO: REMOVE DUPLICATE CATEGORIES;
      return uniqueCategories;
    } catch (e) {
      console.log(e);
      return new RouteResponseClass(
        500,
        "Categories could not be gathered",
        {}
      );
    } finally {
      await database.terminateConnection();
    }
  }
}

export = GetRoutes;
