import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function getAreasByLicence(
  userEmail: string
): Promise<RouteResponseClass> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const user = await database.queryUserByEmailDatabase(userEmail);
    if (!user) return new RouteResponseClass(203, "User not found", {});
    const dbOperation = await database.gatherAllAreasByLicence(user.licenceId);
    return new RouteResponseClass(200, "Here are the categories", {
      dbOperation,
    });
  } catch {
    return new RouteResponseClass(500, "Categories could not be gathered", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = getAreasByLicence;
