import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function acceptOrDeclinceInvite(
  userEmail: string,
  inviteEmail: string,
  accepted: boolean
): Promise<RouteResponse> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const inviteUser = await database.queryUserByEmailDatabase(inviteEmail);
    if (!inviteUser) {
      await database.handleAcceptOrDeclineInvite(
        userEmail,
        inviteUser,
        accepted
      );
    }
    await database.handleAcceptOrDeclineInvite(userEmail, inviteUser, accepted);
    return new RouteResponseClass(200, "Invite was handled.", {});
  } catch (error) {
    return new RouteResponseClass(500, "Internal Server Error", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = acceptOrDeclinceInvite;
