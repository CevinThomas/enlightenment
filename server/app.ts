import Authentication from "./auth/Authentication";
import RouteResponseClass from "./classes/routes/routeResponseClass";

const getAreasByLicence = require("./routes/get/areas/getAreasByLicence");
const getCategoriesBySubject = require("./routes/get/categories/getCategoriesBySubject");
const getResults = require("./routes/get/results/getResults");
const getInvites = require("./routes/get/invites/getInvites");
const getUserLicence = require("./routes/get/user/getUserLicence");
const getSubjectsByArea = require("./routes/get/subjects/getSubjectsByArea");
const getGroupsByCategory = require("./routes/get/groups/getGroupsByCategory");
const getGroupInfo = require("./routes/get/groups/getGroupInfo");
const getQuestionsByGroupId = require("./routes/get/questions/getQuestionsByGroupId");

const register = require("./routes/post/register/register");
const login = require("./routes/post/login/login");
const inviteUser = require("./routes/post/user/inviteUser");
const saveResults = require("./routes/post/results/saveResults");
const acceptOrDeclinceInvite = require("./routes/post/user/acceptOrDeclineInvite");
const deleteQuestion = require("./routes/post/questions/deleteQuestion");
const updateQuestion = require("./routes/post/questions/updateQuestion");
const deleteResult = require("./routes/post/results/deleteResults");
const addQuestions = require("./routes/post/questions/addQuestions");
const uploadProfilePicture = require("./routes/post/uploads/profilePicture");
const addTitle = require("./routes/post/user/addTitle");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const aws = require("aws-sdk");
const uuid = require("uuid");

const upload = multer({
  fileFilter: (req: any, file: any, cb: any) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const hostName = process.env.HOSTNAME;

app.post("/register", async (req: any, res: any) => {
  const response: RouteResponseClass = await register(req.body);
  if (response.statusCode === 200) return res.send(response);
  if (response.statusCode === 400) return res.send(response.data);
  return res.send(response);
});

app.post("/login", async (req: any, res: any) => {
  const response: RouteResponseClass = await login(req.body);
  if (response.statusCode === 200) return res.status(200).send(response);
  if (response.statusCode === 400) return res.send(response);
  return res.send(response);
});

app.post("/login/cms", async (req: any, res: any) => {
  const response: RouteResponseClass = await login(req.body);
  if (response.data !== undefined) {
    if (response.data.role === "admin")
      return res
        .cookie("token", response.data.token, {
          httpOnly: true,
          sameSite: "lax",
        })
        .send(response);
    return res.send(new RouteResponseClass(200, "Incorrect Credentials", {}));
  }
  return res.send(response);
});

app.post("/questions/update", async (req: any, res: any) => {
  const response = await updateQuestion(req.query.questionId, req.body);
  res.send(response);
});

app.post("/questions/delete", async (req: any, res: any) => {
  const response = await deleteQuestion(req.query.questionId);
  res.send(response);
});

app.post("/questions/add", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  if (
    auth.getValidateMessage() === "Unauthorized" ||
    auth.getValidateMessage() === "No token found"
  )
    return res.send(auth.getValidateMessage());
  const response: RouteResponseClass = addQuestions(
    req.body.questions,
    req.body.group,
    auth.getUserFromToken()
  );
  return res.send(response);
});

app.get("/questions/allSubjectsByArea", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await getSubjectsByArea(
    req.query.subject,
    auth.getUserFromToken()
  );
  res.send(response);
});

app.get("/questions/groupId", async (req: any, res: any) => {
  const response = await getQuestionsByGroupId(req.query.group);
  res.send(response);
});

app.get("/groups/getGroupInfo", async (req: any, res: any) => {
  const response = await getGroupInfo(req.query.group);
  res.send(response);
});

app.get("/groups/getGroupsByCategory", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await getGroupsByCategory(
    req.query.group,
    auth.getUserFromToken(),
    req.query.subject
  );
  res.send(response);
});

app.get("/areas/getAreasByLicence", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await getAreasByLicence(auth.getUserFromToken());
  res.send(response);
});

app.get("/categories/getCategoriesBySubject", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await getCategoriesBySubject(
    auth.getUserFromToken(),
    req.query.subject
  );
  res.send(response);
});

app.get("/user/licence", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  if (auth.getValidateMessage() !== "Success")
    return res.send(auth.getValidateMessage());
  const response = await getUserLicence(auth.getUserFromToken());
  res.send(response);
});

app.post("/user/handleInvite", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await acceptOrDeclinceInvite(
    auth.getUserFromToken(),
    req.body.invite,
    req.body.accepted
  );
  res.send(response);
});

app.post("/user/addTitle", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await addTitle(auth.getUserFromToken(), req.body.title);
  res.send(response);
});

app.post("/results/delete", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await deleteResult(auth.getUserFromToken(), req.body.id);
  res.send(response);
});

app.post("/results/save", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  if (
    auth.getValidateMessage() === "Unauthorized" ||
    auth.getValidateMessage() === "No token found"
  )
    return res.send(auth.getValidateMessage());

  const response = await saveResults(auth.getUserFromToken(), req.body);
  return res.send(response);
});

app.get("/results/get", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await getResults(auth.getUserFromToken());
  res.send(response);
});

app.get("/invites/get", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await getInvites(auth.getUserFromToken());
  res.send(response);
});

app.post("/invite/user", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await inviteUser(
    req.body.emailToInvite,
    auth.getUserFromToken()
  );
  return res.send(response);
});

app.post(
  "/uploads/profilePicture",
  upload.single("avatar"),
  async (req: any, res: any) => {
    const auth = new Authentication(req.headers["authorization"]);
    auth.validateToken();

    const myFile = req.file.originalname.split(".");
    const fileType = myFile[myFile.length - 1];
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuid()}.${fileType}`,
      Body: req.file.buffer,
    };

    const response = await uploadProfilePicture(
      params,
      s3,
      auth.getUserFromToken()
    );
    return res.send(response);
  }
);

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});

// @ts-ignore
app.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}/`);
});
