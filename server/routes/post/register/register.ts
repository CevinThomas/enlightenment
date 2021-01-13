import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";
import User from "../../../classes/users/User";
import ValidateUserRegistration from "../../../classes/users/ValidateUserRegistration";

async function register(data: any): Promise<RouteResponse> {
  const userToInsert: ValidateUserRegistration = new ValidateUserRegistration(
    data
  );
  const isValidated: ValidatedUser = await userToInsert.validateInformation();
  if (!isValidated.status)
    return new RouteResponseClass(400, "User input not valid.", isValidated);

  const newUser = new User(data);
  newUser.hashPassword();

  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const existingUser = await database.queryUserByEmailDatabase(
      newUser.getEmail()
    );
    if (existingUser !== null || undefined)
      return new RouteResponseClass(
        203,
        "A user with that email already exists.",
        {}
      );
    await database.insertUserToDatabase(newUser);
    newUser.generateToken();
    await database.terminateConnection();
    return new RouteResponseClass(
      200,
      "Welcome to Enlightenment!",
      newUser.getUsedCredentials()
    );
  } catch (e) {
    await database.terminateConnection();
    return new RouteResponseClass(
      500,
      "Something went wrong when looking up Email",
      undefined
    );
  } finally {
    await database.terminateConnection();
  }
}

module.exports = register;
