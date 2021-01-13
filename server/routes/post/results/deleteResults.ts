import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function deleteResult(
  email: string,
  id: string
): Promise<RouteResponseClass> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    await database.deleteResults(email, id);
    return new RouteResponseClass(200, "Delete successful", {});
  } catch (e) {
    return new RouteResponseClass(
      500,
      "Something went wrong with Deleting the results.",
      {}
    );
  } finally {
    await database.terminateConnection();
  }
}

module.exports = deleteResult;
