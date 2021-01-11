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
  const [areaName, setAreaName] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [questionsData, setQuestionsData] = useState({
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

    setAddedQuestions(clonedAddedQuestions);

    resetQuestionsData();
    setEditingQuestionState(false);
  }

  function cancelUpdateEditingQuestion(id: number): void {
    setEditingQuestionState(false);
    resetQuestionsData();
  }

  function editQuestion(id: number): void {
    const clonedSavedQuestions = [...addedQuestions];
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
      question.areaName = areaName;
      question.subjectName = subjectName;
      question.category = category;
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
  }

  function onOptionExplanationHandlerChange(e: any): void {
    const clonedOptions = questionsData.options;
    clonedOptions[e.target.name].explanation = e.target.value;
    setQuestionsData({
      ...questionsData,
      options: clonedOptions,
    });
  }

  function areaNameChange(e: any): void {
    setAreaName(e.target.value);
  }

  function subjectNameChange(e: any): void {
    setSubjectName(e.target.value);
  }

  function categoryNameChange(e: any): void {
    setCategory(e.target.value);
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
          subjectNameChange={subjectNameChange}
          subjectName={subjectName}
          areaNameChange={areaNameChange}
          areaName={areaName}
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
          categoryNameChange={categoryNameChange}
          categoryName={category}
          addedQuestions={addedQuestions}
          optionChange={onOptionChangeHandler}
          changeName={onNameChangeHandler}
          saveQuestion={saveQuestion}
          newQuestion={questionsData}
          tagChange={onTagChangeHandler}
        />
      );
    } else {
      return <Redirect to={"/"} />;
    }
  };

  return <React.Fragment>{ComponentToShow()}</React.Fragment>;
};

export default QuestionsContainer;
