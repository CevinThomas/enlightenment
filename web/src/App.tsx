import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import EditQuestionContainer from "./components/editQuestion/editQuestionContainer";
import AllQuestionsContainer from "./components/EditStoredQuestions/allQuestionsContainer";
import InviteContainer from "./Invite/invite-container";
import LoginContainer from "./Login/login-container";
import QuestionsContainer from "./Questions/questions-container";

const MainContainer = styled.main`
  max-width: 1140px;
  width: 90%;
  margin: 0 auto;
`;

function App() {
  // @ts-ignore
  return (
    <Router>
      <MainContainer>
        <Switch>
          <Route exact={true} path="/" component={LoginContainer} />
          <Route path={"/add-questions"} component={QuestionsContainer} />
          <Route path={"/all-questions"} component={AllQuestionsContainer} />
          <Route
            path={"/edit-question/:questionId"}
            component={EditQuestionContainer}
          />
          <Route path={"/invite"} component={InviteContainer} />
        </Switch>
      </MainContainer>
    </Router>
  );
}

export default App;
