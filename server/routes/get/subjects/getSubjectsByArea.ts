import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function getSubjectsByArea(
  areaChosen: string,
  userEmail: string
): Promise<RouteResponseClass> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    if (typeof areaChosen !== "string")
      return new RouteResponseClass(200, "Was not given a string.", {});

    const user = await database.queryUserByEmailDatabase(userEmail);
    if (!user) return new RouteResponseClass(203, "User not found", {});

    const dbOperation = await database.gatherSubjectsByAreaChosen(
      areaChosen,
      user.licenceId
    );

    return new RouteResponseClass(
      200,
      "Here are the requested Groups by Category, and their questions by category",
      {
        dbOperation,
      }
    );
  } catch {
    return new RouteResponseClass(500, "Questions could not be gathered", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = getSubjectsByArea;
