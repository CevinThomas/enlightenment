import React from "react";
import styled from "styled-components";
import { Options, QuestionsData } from "../interfaces/questionsData";
import OptionCrud from "./optionCrud";

const Container = styled.div``;

const QuestionName = styled.input``;

const QuestionTags = styled.input``;

interface IProps {
  questionData: QuestionsData;
  changeName: (e: any) => void;
  optionChange: (e: any) => void;
  correctHandler: (e: any) => void;
  optionExplanation: (e: any) => void;
  tagChange: (e: any) => void;
}

const QuestionCrud = ({
  tagChange,
  questionData,
  changeName,
  optionChange,
  correctHandler,
  optionExplanation,
}: IProps) => {
  return (
    <Container>
      <QuestionName
        onChange={changeName}
        value={questionData.name}
        placeholder={"Name of Question"}
      />
      <QuestionTags
        placeholder={"Tag"}
        value={questionData.tags}
        onChange={tagChange}
      />
      {questionData.options.length !== 0
        ? questionData.options.map((option: Options) => {
            return (
              <OptionCrud
                optionExplanation={optionExplanation}
                correctHandler={correctHandler}
                optionChange={optionChange}
                placeholder={option.id}
                value={option}
                key={option.id}
              />
            );
          })
        : null}
    </Container>
  );
};

export default QuestionCrud;
