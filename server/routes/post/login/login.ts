import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";
import User from "../../../classes/users/User";
import ValidateUserLogin from "../../../classes/users/ValidateUserLogin";

async function login(data: any) {
  const userToLogin: ValidateUserLogin = new ValidateUserLogin(data);
  const isValidated: ValidatedUser = await userToLogin.validateInformation();
  if (!isValidated.status)
    return new RouteResponseClass(400, "User input not valid.", isValidated);

  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const userExists = await database.queryUserByEmailDatabase(data.email);

    if (userExists !== null || undefined) {
      const updatedUser = new User(userExists);
      if (!updatedUser.doPasswordsMatch(data.password))
        return new RouteResponseClass(204, "Incorrect Credentials.", undefined);

      updatedUser.generateToken();

      return new RouteResponseClass(
        200,
        "Here is the logged in User.",
        updatedUser.getUsedCredentials()
      );
    } else {
      return new RouteResponseClass(204, "User not found.", undefined);
    }
  } catch (e) {
    console.log(e);
    return new RouteResponseClass(
      500,
      "Something went wrong with the login process.",
      undefined
    );
  } finally {
    await database.terminateConnection();
  }
}

module.exports = login;
