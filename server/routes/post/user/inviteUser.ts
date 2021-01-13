import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function inviteUser(
  emailToInvite: string,
  recevingEmail: string
): Promise<RouteResponse> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const userToInvite = await database.queryUserByEmailDatabase(emailToInvite);
    if (!userToInvite)
      return new RouteResponseClass(
        204,
        "No user was found with that email.",
        {}
      );

    await database.sendInviteToUser(userToInvite, recevingEmail);
    return new RouteResponseClass(200, "User was successfully invited.", {});
  } catch (error) {
    return new RouteResponseClass(
      500,
      "Something went wrong with the Invite.",
      {}
    );
  } finally {
    await database.terminateConnection();
  }
}

module.exports = inviteUser;
