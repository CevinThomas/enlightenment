import React from "react";
import styled from "styled-components";
import Heading from "../components/heading";
import QuestionCrud from "../components/questionCrud";
import QuestionOverview from "../components/questionOverview";
import { QuestionsData } from "../interfaces/questionsData";

const MainContainer = styled.main``;

const HeadingSection = styled.section``;

const FormsSection = styled.section``;

const SubmitSection = styled.section``;

const AddQuestionButton = styled.button``;

const SubmitQuestions = styled.button``;

const GroupNameInput = styled.input``;

const SavedUpdatedQuestion = styled.button``;

const CancelUpdatedQuestion = styled.button``;

const AreaNameInput = styled.input``;

const SubjectNameInput = styled.input``;

const CategoryNameInput = styled.input``;

interface IProps {
  addedQuestions: Array<QuestionsData>;
  newQuestion: QuestionsData;
  groupName: string;
  areaName: string;
  subjectName: string;
  categoryName: string;
  subjectNameChange: (e: any) => void;
  areaNameChange: (e: any) => void;
  submitQuestions: () => void;
  saveQuestion: () => void;
  changeName: (e: any) => void;
  optionChange: (e: any) => void;
  categoryNameChange: (e: any) => void;
  groupNameChange: (e: any) => void;
  correctHandler: (e: any) => void;
  optionExplanation: (e: any) => void;
  deleteQuestion: (id: number) => void;
  editQuestion: (id: number) => void;
  currentlyEditing: boolean;
  updateQuestion: (id: number) => void;
  cancelUpdate: (id: number) => void;
}

const QuestionsView = ({
  areaName,
  categoryNameChange,
  categoryName,
  areaNameChange,
  newQuestion,
  saveQuestion,
  changeName,
  optionChange,
  addedQuestions,
  groupNameChange,
  correctHandler,
  optionExplanation,
  groupName,
  subjectNameChange,
  subjectName,
  submitQuestions,
  deleteQuestion,
  editQuestion,
  currentlyEditing,
  updateQuestion,
  cancelUpdate,
}: IProps) => {
  return (
    <MainContainer>
      <HeadingSection>
        <Heading>
          {currentlyEditing && newQuestion !== undefined
            ? `Currently Editing: ${newQuestion.name}`
            : "Add Questions"}
        </Heading>
      </HeadingSection>
      <FormsSection>
        {currentlyEditing && newQuestion !== undefined ? (
          <React.Fragment>
            <QuestionCrud
              optionExplanation={optionExplanation}
              correctHandler={correctHandler}
              optionChange={optionChange}
              changeName={changeName}
              questionData={newQuestion}
            />
            <SavedUpdatedQuestion
              onClick={() => updateQuestion(newQuestion.id)}
            >
              Update!
            </SavedUpdatedQuestion>
            <CancelUpdatedQuestion onClick={() => cancelUpdate(newQuestion.id)}>
              Cancel
            </CancelUpdatedQuestion>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <AreaNameInput
              onChange={areaNameChange}
              value={areaName}
              placeholder={"Area"}
            />
            <SubjectNameInput
              onChange={subjectNameChange}
              value={subjectName}
              placeholder={"Subject"}
            />
            <GroupNameInput
              onChange={groupNameChange}
              value={groupName}
              placeholder={"Group Name"}
            />
            <CategoryNameInput
              onChange={categoryNameChange}
              value={categoryName}
              placeholder={"Category"}
            />

            {addedQuestions.length !== 0
              ? addedQuestions.map((question: QuestionsData) => {
                  return (
                    <QuestionOverview
                      editQuestion={editQuestion}
                      deleteQuestion={deleteQuestion}
                      key={question.id}
                      questionsData={question}
                    />
                  );
                })
              : null}
            <QuestionCrud
              optionExplanation={optionExplanation}
              correctHandler={correctHandler}
              optionChange={optionChange}
              changeName={changeName}
              questionData={newQuestion}
            />
            <AddQuestionButton onClick={saveQuestion}>
              Add Question
            </AddQuestionButton>
          </React.Fragment>
        )}
      </FormsSection>
      <SubmitSection>
        <SubmitQuestions onClick={submitQuestions}>Submit</SubmitQuestions>
      </SubmitSection>
    </MainContainer>
  );
};

export default QuestionsView;
