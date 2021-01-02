import DatabaseOperations from "../database/databaseOperations";
import Questions from "../questions/questions";
import HasPermissions from "../users/hasPermissions";
import User from "../users/User";
import ValidateUserLogin from "../users/ValidateUserLogin";
import ValidateUserRegistration from "../users/ValidateUserRegistration";
import RouteResponseClass from "./routeResponseClass";

class PostRoutes {
  constructor() {}

  public static async register(data: any): Promise<RouteResponse> {
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

  public static async login(data: any) {
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
          return new RouteResponseClass(
            204,
            "Incorrect Credentials.",
            undefined
          );

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

  public static async inviteUser(
    emailToInvite: string,
    recevingEmail: string
  ): Promise<RouteResponse> {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      const userToInvite = await database.queryUserByEmailDatabase(
        emailToInvite
      );
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

  public static async saveResults(
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

  public static async acceptOrDeclinceInvite(
    userEmail: string,
    inviteEmail: string,
    accepted: boolean
  ): Promise<RouteResponse> {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      // Get inviteEmail licence number
      const inviteUser = await database.queryUserByEmailDatabase(inviteEmail);
      if (!inviteUser) {
        await database.handleAcceptOrDeclineInvite(
          userEmail,
          inviteUser,
          accepted
        );
      }
      await database.handleAcceptOrDeclineInvite(
        userEmail,
        inviteUser,
        accepted
      );
      return new RouteResponseClass(200, "Invite was handled.", {});
    } catch (error) {
      return new RouteResponseClass(500, "Internal Server Error", {});
    } finally {
      await database.terminateConnection();
    }
  }

  public static async deleteQuestion(query: string): Promise<RouteResponse> {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      await database.deleteQuestion(query);
      return new RouteResponseClass(200, "Delete successful", {});
    } catch (e) {
      return new RouteResponseClass(
        500,
        "SOmething went wrong with deleting question.",
        {}
      );
    } finally {
      await database.terminateConnection();
    }
  }

  public static async updateQuestion(
    query: string,
    newData: any
  ): Promise<RouteResponse> {
    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      await database.updateQuestion(query, newData.updatedQuestion);
      return new RouteResponseClass(200, "Update successful", {});
    } catch (e) {
      return new RouteResponseClass(
        500,
        "Something went wrong with updating the question.",
        {}
      );
    } finally {
      await database.terminateConnection();
    }
  }

  public static async deleteResult(
    email: string,
    id: string
  ): Promise<RouteResponseClass> {
    const database = new DatabaseOperations();
    await database.initiateConnection();
    console.log("HEY");

    try {
      await database.deleteResults(email, id);
      return new RouteResponseClass(200, "Delete successful", {});
    } catch (e) {
      return new RouteResponseClass(
        500,
        "Something went wrong with Deleting the results.",
        {}
      );
    } finally {
      await database.terminateConnection();
    }
  }

  public static async addQuestions(
    data: any,
    emailThatAddedQuestions: string
  ): Promise<RouteResponse> {
    //TODO: Validate questions
    const questions = new Questions(data);
    questions.generateObjectIdForGroupId();
    questions.generateLowerCaseProperties();

    const database = new DatabaseOperations();
    await database.initiateConnection();

    try {
      const user = await database.queryUserByEmailDatabase(
        emailThatAddedQuestions
      );

      const doesUserHavePermissions = new HasPermissions(user);

      if (doesUserHavePermissions.retrieveAccess() !== true)
        return new RouteResponseClass(203, "Access denied", {});

      await database.insertQuestionsIntoDatabase(
        questions,
        doesUserHavePermissions.retrieveLicenceId()
      );
      return new RouteResponseClass(200, "Questions have been added.", {});
    } catch (e) {
      console.log(e);
      return new RouteResponseClass(
        500,
        "Something went wrong with adding the questions.",
        {}
      );
    } finally {
      await database.terminateConnection();
    }

    return new RouteResponseClass(200, "Something", undefined);
  }
}

export = PostRoutes;
