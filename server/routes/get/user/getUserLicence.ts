import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function getUserLicence(userEmail: string): Promise<RouteResponseClass> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const user = await database.queryUserByEmailDatabase(userEmail);
    if (!user) return new RouteResponseClass(204, "User not found.", {});
    return new RouteResponseClass(200, "LicenceId", user.licenceId);
  } catch (e) {
    return new RouteResponseClass(500, "LicenceId could not be gathered.", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = getUserLicence;
