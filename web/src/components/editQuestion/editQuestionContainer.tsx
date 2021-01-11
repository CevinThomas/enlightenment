import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import EnvVariables from "../../envVariables";
import { QuestionsData } from "../../interfaces/questionsData";
import EditQuestionView from "./editQuestionView";

const EditQuestionContainer = ({ match, location, history }: any) => {
  const [questionId, setQuestionId] = useState<string>("");
  const [questionsData, setQuestionsData] = useState<QuestionsData>({
    _id: 0,
    id: 0,
    name: "",
    category: "",
    groupName: "",
    areaName: "",
    subjectName: "",
    groupId: 0,
    answered: 0,
    answeredCorrectly: 0,
    options: [
      { choice: "", correct: false, explanation: "", id: 0 },
      { choice: "", correct: false, explanation: "", id: 1 },
      { choice: "", correct: false, explanation: "", id: 2 },
      { choice: "", correct: false, explanation: "", id: 3 },
    ],
    tags: "",
  });

  useEffect(() => {
    if (match.params.questionId !== null || undefined) {
      setQuestionId(match.params.questionId);
      fetchQuestionById(match.params.questionId)
        .then((r) => {
          if (r.data.data !== null || undefined) {
            return setQuestionsData(r.data.data);
          } else {
            return <Redirect to={"/all-questions"} />;
          }
        })
        .catch((e) => <Redirect to={"/all-questions"} />);
    }
  }, []);

  async function fetchQuestionById(id: string) {
    const cookie = new Cookies();
    return await Axios.get(
      `${EnvVariables.API_ENDPOINTS.GETQUESTIONBYID}?questionId=${id}`,
      {
        headers: {
          Authorization: cookie.get("token"),
        },
      }
    );
  }

  function onOptionExplanationHandlerChange(e: any): void {
    const clonedOptions = questionsData.options;
    clonedOptions[e.target.name].explanation = e.target.value;
    setQuestionsData({
      ...questionsData,
      options: clonedOptions,
    });
  }

  async function deleteQuestionHandler() {
    const cookie = new Cookies();
    const response = await Axios.post(
      `${EnvVariables.API_ENDPOINTS.DELETEQUESTION}?questionId=${questionId}`,
      {},
      {
        headers: {
          Authorization: cookie.get("token"),
        },
      }
    );
    if (response.data.statusCode !== 200) {
      return history.push("/");
    } else {
      return history.push("/all-questions");
    }
  }

  function onNameChangeHandler(e: any): void {
    setQuestionsData({
      ...questionsData,
      name: e.target.value,
    });
  }

  function onTagChangeHandler(e: any): void {
    setQuestionsData({
      ...questionsData,
      tags: e.target.value,
    });
  }

  function onCorrectChangeHandler(e: any): void {
    const clonedOptions = questionsData.options;
    clonedOptions[e.target.id].correct = e.target.checked;
    setQuestionsData({
      ...questionsData,
      options: clonedOptions,
    });
  }

  function onOptionChangeHandler(e: any): void {
    const clonedOptions = questionsData.options;
    clonedOptions[e.target.id].choice = e.target.value;
    setQuestionsData({
      ...questionsData,
      options: clonedOptions,
    });
  }

  async function updateQuestion() {
    //TODO: Send update questionsData to server
    const cookie = new Cookies();
    const response = await Axios.post(
      `${EnvVariables.API_ENDPOINTS.UPDATEQUESTION}?questionId=${questionId}`,
      {
        updatedQuestion: questionsData,
      },
      {
        headers: {
          Authorization: cookie.get("token"),
        },
      }
    );
    if (response.data.statusCode !== 200) {
      return history.push("/");
    } else {
      return history.push("/all-questions");
    }
  }

  const ComponentToShow = () => {
    const cookie = new Cookies();
    if (cookie.get("token") !== undefined) {
      return (
        <EditQuestionView
          tagChange={onTagChangeHandler}
          deleteQuestion={deleteQuestionHandler}
          updateQuestion={updateQuestion}
          optionExplanation={onOptionExplanationHandlerChange}
          correctHandler={onCorrectChangeHandler}
          optionChange={onOptionChangeHandler}
          changeName={onNameChangeHandler}
          newQuestion={questionsData}
        />
      );
    } else {
      return <Redirect to={"/"} />;
    }
  };

  return <React.Fragment>{ComponentToShow()}</React.Fragment>;
};

export default EditQuestionContainer;
