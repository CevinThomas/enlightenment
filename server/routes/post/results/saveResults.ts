import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function saveResults(
  userEmail: string,
  results: any
): Promise<RouteResponse> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    await database.saveResultsToDB(userEmail, results);
    return new RouteResponseClass(200, "Success", {});
  } catch (e) {
    return new RouteResponseClass(500, "Error with saving results.", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = saveResults;
