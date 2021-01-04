import Authentication from "./auth/Authentication";
import GetRoutes from "./classes/routes/getRoutes";
import PostRoutes from "./classes/routes/postRoutes";
import RouteResponseClass from "./classes/routes/routeResponseClass";

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");

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

app.post("/login", async (req: any, res: any) => {
  const response: RouteResponseClass = await PostRoutes.login(req.body);
  if (response.statusCode === 200) return res.status(200).send(response);
  if (response.statusCode === 400) return res.send(response);
  return res.send(response);
});

app.post("/login/cms", async (req: any, res: any) => {
  const response: RouteResponseClass = await PostRoutes.login(req.body);
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

app.post("/register", async (req: any, res: any) => {
  const response: RouteResponseClass = await PostRoutes.register(req.body);
  if (response.statusCode === 200) return res.send(response);
  if (response.statusCode === 400) return res.send(response.data);
  return res.send(response);
});

app.post("/invite/user", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await PostRoutes.inviteUser(
    req.body.emailToInvite,
    auth.getUserFromToken()
  );
  return res.send(response);
});

app.post("/questions/saveresults", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  if (
    auth.getValidateMessage() === "Unauthorized" ||
    auth.getValidateMessage() === "No token found"
  )
    return res.send(auth.getValidateMessage());

  const response = await PostRoutes.saveResults(
    auth.getUserFromToken(),
    req.body
  );
  return res.send(response);
});

app.post("/questions/update", async (req: any, res: any) => {
  const response = await PostRoutes.updateQuestion(
    req.query.questionId,
    req.body
  );
  res.send(response);
});

app.post("/questions/delete", async (req: any, res: any) => {
  const response = await PostRoutes.deleteQuestion(req.query.questionId);
  res.send(response);
});

app.post("/add/questions", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  if (
    auth.getValidateMessage() === "Unauthorized" ||
    auth.getValidateMessage() === "No token found"
  )
    return res.send(auth.getValidateMessage());
  const response: RouteResponseClass = await PostRoutes.addQuestions(
    req.body,
    auth.getUserFromToken()
  );
  return res.send(response);
});

app.post("/invites/handle", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await PostRoutes.acceptOrDeclinceInvite(
    auth.getUserFromToken(),
    req.body.invite,
    req.body.accepted
  );
  res.send(response);
});

app.post("/questions/deleteresult", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await PostRoutes.deleteResult(
    auth.getUserFromToken(),
    req.body.id
  );
  res.send(response);
});

app.get("/questions/getresults", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await GetRoutes.getResults(auth.getUserFromToken());
  res.send(response);
});

app.get("/invites/get", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await GetRoutes.getInvites(auth.getUserFromToken());
  res.send(response);
});

app.get("/questions/questionId", async (req: any, res: any) => {
  const response = await GetRoutes.getQuestionById(req.query.questionId);
  res.send(response);
});

app.get("/questions/allCategories", async (req: any, res: any) => {
  const response = await GetRoutes.getAllCategories();
  res.send(response);
});

app.get("/questions/allCategoriesByLicence", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  const response = await GetRoutes.getCategoriesByLicence(
    auth.getUserFromToken()
  );
  res.send(response);
});

app.get("/user/licence", async (req: any, res: any) => {
  const auth = new Authentication(req.headers["authorization"]);
  auth.validateToken();
  if (auth.getValidateMessage() !== "Success")
    return res.send(auth.getValidateMessage());
  const response = await GetRoutes.getUserLicence(auth.getUserFromToken());
  res.send(response);
});

app.get("/questions/licence", async (req: any, res: any) => {
  const response = await GetRoutes.getQuestionsByLicence(req.query.licence);
  res.send(response);
});

app.get("/questions/group", async (req: any, res: any) => {
  const response = await GetRoutes.getQuestionsByGroupName(req.query);
  res.send(response);
});

app.get("/questions/groupId", async (req: any, res: any) => {
  const response = await GetRoutes.getQuestionsByGroupId(req.query.id);
  res.send(response);
});

app.get("/questions/category", async (req: any, res: any) => {
  const response = await GetRoutes.getQuestionsByCategory(req.query);
  res.send(response);
});

app.get("/questions/categoryGroup", async (req: any, res: any) => {
  const response = await GetRoutes.getGroupsForCategory(req.query.group);
  res.send(response);
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});

// @ts-ignore
app.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}/`);
});
