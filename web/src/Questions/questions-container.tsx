import Axios from "axios";
import React, { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import EnvVariables from "../envVariables";
import { QuestionsData } from "../interfaces/questionsData";
import QuestionsView from "./questions-view";

const QuestionsContainer = () => {
  const [addedQuestions, setAddedQuestions] = useState<Array<QuestionsData>>(
    []
  );
  const [editingQuestionState, setEditingQuestionState] = useState<boolean>(
    false
  );
  const [groupName, setGroupName] = useState<string>("");

  const [questionsData, setQuestionsData] = useState({
    id: 0,
    name: "",
    category: "",
    groupName: "",
    groupId: 0,
    answered: 0,
    answeredCorrectly: 0,
    options: [
      { choice: "", correct: false, explanation: "", id: 0 },
      { choice: "", correct: false, explanation: "", id: 1 },
      { choice: "", correct: false, explanation: "", id: 2 },
      { choice: "", correct: false, explanation: "", id: 3 },
    ],
  });

  const counterForQuestions = useRef<number>(0);

  function deleteQuestion(id: number): void {
    const clonedSavedQuestions = [...addedQuestions];
    const filteredQuestions = clonedSavedQuestions.filter(
      (question) => question.id !== id
    );
    setAddedQuestions(filteredQuestions);
  }

  function saveQuestion(): void {
    const addedQuestionsClone = [...addedQuestions];
    console.log("QUESTION TO ADD:", questionsData);
    //TODO Validate questions before adding
    addedQuestionsClone.push(questionsData);
    setAddedQuestions(addedQuestionsClone);
    counterForQuestions.current = counterForQuestions.current + 1;
    resetQuestionsData();
  }

  function updateEditingQuestion(id: number): void {
    const clonedAddedQuestions = [...addedQuestions];

    for (let i = 0; i < clonedAddedQuestions.length; i++) {
      if (clonedAddedQuestions[i].id === questionsData.id) {
        clonedAddedQuestions[i] = questionsData;
      }
    }

    console.log(clonedAddedQuestions);

    setAddedQuestions(clonedAddedQuestions);

    resetQuestionsData();
    setEditingQuestionState(false);
  }

  function cancelUpdateEditingQuestion(id: number): void {
    setEditingQuestionState(false);
    resetQuestionsData();
  }

  function editQuestion(id: number): void {
    console.log("EDITING", id);
    const clonedSavedQuestions = [...addedQuestions];
    console.log(clonedSavedQuestions);
    const questionToEdit = clonedSavedQuestions.filter(
      (question) => question.id === id
    );
    setQuestionsData(questionToEdit[0]);
    setEditingQuestionState(true);
  }

  async function submitQuestions() {
    const clonedAddedQuestions = [...addedQuestions];

    clonedAddedQuestions.forEach((question) => {
      question.groupName = groupName;
    });

    const cookies = new Cookies();

    const response = await Axios.post(
      `${EnvVariables.API_ENDPOINTS.ADDQUESTIONS}`,
      clonedAddedQuestions,
      {
        headers: {
          Authorization: cookies.get("token"),
        },
      }
    );

    if (response.data.data.statusCode === 200) {
      return <Redirect to="/all-questions" />;
    }
  }

  function resetQuestionsData(): void {
    setQuestionsData({
      id: counterForQuestions.current,
      name: "",
      category: "",
      groupName: "",
      groupId: 0,
      answered: 0,
      answeredCorrectly: 0,
      options: [
        { choice: "", correct: false, explanation: "", id: 0 },
        { choice: "", correct: false, explanation: "", id: 1 },
        { choice: "", correct: false, explanation: "", id: 2 },
        { choice: "", correct: false, explanation: "", id: 3 },
      ],
    });
  }

  function onOptionExplanationHandlerChange(e: any): void {
    const clonedOptions = questionsData.options;
    clonedOptions[e.target.name].explanation = e.target.value;
    setQuestionsData({
      ...questionsData,
      options: clonedOptions,
    });
  }

  function onNameChangeHandler(e: any): void {
    setQuestionsData({
      ...questionsData,
      name: e.target.value,
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

  function onCategoryChangeHandler(e: any): void {
    setQuestionsData({
      ...questionsData,
      category: e.target.value,
    });
  }

  function onGroupNameChangeHandler(e: any): void {
    setGroupName(e.target.value);
  }

  function onOptionChangeHandler(e: any): void {
    const clonedOptions = questionsData.options;
    clonedOptions[e.target.id].choice = e.target.value;
    setQuestionsData({
      ...questionsData,
      options: clonedOptions,
    });
  }

  const ComponentToShow = () => {
    const cookie = new Cookies();
    if (cookie.get("token") !== undefined) {
      return (
        <QuestionsView
          cancelUpdate={cancelUpdateEditingQuestion}
          updateQuestion={updateEditingQuestion}
          currentlyEditing={editingQuestionState}
          editQuestion={editQuestion}
          deleteQuestion={deleteQuestion}
          submitQuestions={submitQuestions}
          groupName={groupName}
          optionExplanation={onOptionExplanationHandlerChange}
          correctHandler={onCorrectChangeHandler}
          groupNameChange={onGroupNameChangeHandler}
          categoryChange={onCategoryChangeHandler}
          addedQuestions={addedQuestions}
          optionChange={onOptionChangeHandler}
          changeName={onNameChangeHandler}
          saveQuestion={saveQuestion}
          newQuestion={questionsData}
        />
      );
    } else {
      return <Redirect to={"/"} />;
    }
  };

  return <React.Fragment>{ComponentToShow()}</React.Fragment>;
};

export default QuestionsContainer;
