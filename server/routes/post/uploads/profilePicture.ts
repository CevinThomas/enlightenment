import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function uploadProfilePicture(): Promise<RouteResponseClass> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    return new RouteResponseClass(200, "Hello", {});
  } catch (error) {
    return new RouteResponseClass(500, "ISE", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = uploadProfilePicture;
