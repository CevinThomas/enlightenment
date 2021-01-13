import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function updateQuestion(
  query: string,
  newData: any
): Promise<RouteResponse> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    await database.updateQuestion(query, newData.updatedQuestion);
    return new RouteResponseClass(200, "Update successful", {});
  } catch (e) {
    return new RouteResponseClass(
      500,
      "Something went wrong with updating the question.",
      {}
    );
  } finally {
    await database.terminateConnection();
  }
}

module.exports = updateQuestion;
