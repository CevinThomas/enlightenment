import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { QuestionsData } from "../../interfaces/questionsData";
import QuestionCrud from "../questionCrud";

interface IProps {
  changeName: (e: any) => void;
  optionChange: (e: any) => void;
  categoryChange: (e: any) => void;
  correctHandler: (e: any) => void;
  optionExplanation: (e: any) => void;
  updateQuestion: () => void;
  deleteQuestion: () => void;
  newQuestion: QuestionsData;
}

const Container = styled.main``;

const ButtonContainer = styled.section``;

const UpdateButton = styled.button``;

const DeleteButton = styled.button``;

const EditQuestionView = ({
  changeName,
  optionExplanation,
  optionChange,
  correctHandler,
  categoryChange,
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
          categoryChange={categoryChange}
          optionChange={optionChange}
          changeName={changeName}
          questionData={newQuestion}
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
