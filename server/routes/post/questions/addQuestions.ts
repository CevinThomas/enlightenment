import DatabaseOperations from "../../../classes/database/databaseOperations";
import Questions from "../../../classes/questions/questions";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";
import HasPermissions from "../../../classes/users/hasPermissions";

async function addQuestions(
  data: any,
  group: any,
  emailThatAddedQuestions: string
): Promise<RouteResponse> {
  //TODO: Validate questions
  const questions = new Questions(data);
  questions.generateObjectIdForGroupId();
  questions.generateLowerCaseProperties();
  questions.generateOptionsIds();

  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const user = await database.queryUserByEmailDatabase(
      emailThatAddedQuestions
    );

    const doesUserHavePermissions = new HasPermissions(user);

    if (doesUserHavePermissions.retrieveAccess() !== true)
      return new RouteResponseClass(203, "Access denied", {});

    group.licenceGroup = doesUserHavePermissions.retrieveLicenceId();
    group.groupId = questions.questionsData[0].groupId;

    await database.insertGroupIntoDatabase(group);

    await database.insertQuestionsIntoDatabase(
      questions,
      doesUserHavePermissions.retrieveLicenceId()
    );
    return new RouteResponseClass(200, "Questions have been added.", {});
  } catch (e) {
    console.log(e);
    return new RouteResponseClass(
      500,
      "Something went wrong with adding the questions.",
      {}
    );
  } finally {
    await database.terminateConnection();
  }
}

module.exports = addQuestions;
