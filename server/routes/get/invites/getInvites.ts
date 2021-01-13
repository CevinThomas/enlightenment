import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function getInvites(email: string): Promise<RouteResponseClass> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const user = await database.queryUserByEmailDatabase(email);
    if (!user) return new RouteResponseClass(204, "User not found.", {});
    return new RouteResponseClass(200, "Here are the invites.", {
      invites: user.invites,
    });
  } catch (error) {
    return new RouteResponseClass(500, "Invites could not be gathered.", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = getInvites;
