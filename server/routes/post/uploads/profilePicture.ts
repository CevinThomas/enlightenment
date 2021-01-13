import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";

async function uploadProfilePicture(
  s3Params: any,
  s3: any,
  userEmail: string
): Promise<RouteResponseClass> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    s3.upload(s3Params, (error: any, data: any) => {
      if (error) {
        database.terminateConnection();
        return new RouteResponseClass(500, "Error", {});
      }
      database
        .uploadProfilePicture(userEmail, data.Location)
        .then(() => {
          database.terminateConnection();
          return new RouteResponseClass(200, "Success", {});
        })
        .catch((e) => console.log("FUNCTION CATCH", e));
    });
  } catch (error) {
    await database.terminateConnection();
    return new RouteResponseClass(500, "ISE", {});
  }
}

module.exports = uploadProfilePicture;
