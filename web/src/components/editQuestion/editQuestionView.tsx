import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { QuestionsData } from "../../interfaces/questionsData";
import QuestionCrud from "../questionCrud";

interface IProps {
  changeName: (e: any) => void;
  optionChange: (e: any) => void;
  correctHandler: (e: any) => void;
  optionExplanation: (e: any) => void;
  updateQuestion: () => void;
  deleteQuestion: () => void;
  tagChange: (e: any) => void;
  newQuestion: QuestionsData;
}

const Container = styled.main``;

const ButtonContainer = styled.section``;

const UpdateButton = styled.button``;

const DeleteButton = styled.button``;

const EditQuestionView = ({
  tagChange,
  changeName,
  optionExplanation,
  optionChange,
  correctHandler,
  updateQuestion,
  newQuestion,
  deleteQuestion,
}: IProps) => {
  return (
    <Container>
      {newQuestion !== undefined ? (
        <QuestionCrud
          optionExplanation={optionExplanation}
          correctHandler={correctHandler}
          optionChange={optionChange}
          changeName={changeName}
          questionData={newQuestion}
          tagChange={tagChange}
        />
      ) : null}

      <ButtonContainer>
        <UpdateButton onClick={updateQuestion}>Update</UpdateButton>
        <DeleteButton onClick={deleteQuestion}>Delete</DeleteButton>
        <Link to={"/all-questions"}>Cancel</Link>
      </ButtonContainer>
    </Container>
  );
};

export default EditQuestionView;
