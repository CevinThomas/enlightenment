import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function getGroupsByCategory(
  requestParams: any,
  userEmail: string,
  subjectChosen: string
): Promise<RouteResponseClass> {
  //TODO: Validate categoryParam before initializing database connection
  let categoryParam: any;
  const database = new DatabaseOperations();
  await database.initiateConnection();

  categoryParam = requestParams;
  try {
    if (typeof categoryParam !== "string")
      return new RouteResponseClass(200, "Was not given a string.", {});

    const user = await database.queryUserByEmailDatabase(userEmail);

    if (!user) return new RouteResponseClass(203, "User not found.", {});

    const arrayOfQuestions = await database.gatherQuestionsByCategory(
      categoryParam,
      user.licenceId,
      subjectChosen
    );

    const finalArray = await arrayOfQuestions.toArray();

    const seen: Array<string> = [];
    const dbOperation = finalArray.filter(
      (group: { groupName: string; groupId: string }) => {
        if (!seen.includes(group.groupId)) {
          seen.push(group.groupId);
          return group;
        }
        return;
      }
    );

    //TODO: Create a hash table with the groupName as key, and all questions under that as array

    return new RouteResponseClass(
      200,
      "Here are the requested Groups by Category, and their questions by category",
      { dbOperation }
    );
  } catch (e) {
    console.log(e);
    return new RouteResponseClass(500, "Questions could not be gathered", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = getGroupsByCategory;
