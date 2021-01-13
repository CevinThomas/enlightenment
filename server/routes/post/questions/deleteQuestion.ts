import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function deleteQuestion(query: string): Promise<RouteResponse> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    await database.deleteQuestion(query);
    return new RouteResponseClass(200, "Delete successful", {});
  } catch (e) {
    return new RouteResponseClass(
      500,
      "SOmething went wrong with deleting question.",
      {}
    );
  } finally {
    await database.terminateConnection();
  }
}

module.exports = deleteQuestion;
