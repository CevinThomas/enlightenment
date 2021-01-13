import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function addTitle(
  userEmail: string,
  title: string
): Promise<RouteResponseClass> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    await database.insertTitle(userEmail, title);
    return new RouteResponseClass(200, "Success", {});
  } catch (err) {
    return new RouteResponseClass(500, "Internal Server Error", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = addTitle;
