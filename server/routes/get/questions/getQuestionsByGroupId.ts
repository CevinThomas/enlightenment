import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function getQuestionsByGroupId(
  requestParams: any
): Promise<RouteResponseClass> {
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

module.exports = getQuestionsByGroupId;
