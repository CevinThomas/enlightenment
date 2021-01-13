import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function getGroupInfo(group: string) {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const groupInfo = await database.getGroupInfo(group);
    return new RouteResponseClass(200, "Here is the group.", groupInfo);
  } catch (e) {
    return new RouteResponseClass(500, "There was an error", {});
    console.log(e);
  } finally {
    await database.terminateConnection();
  }
}

module.exports = getGroupInfo;
