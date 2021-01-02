import React, {MutableRefObject, useEffect} from 'react';
import styled from "styled-components";
import Heading from "../components/heading";
import QuestionCrud from "../components/questionCrud";
import {QuestionsData} from "../interfaces/questionsData";
import QuestionOverview from "../components/questionOverview";

const MainContainer = styled.main`

`

const HeadingSection = styled.section`

`

const FormsSection = styled.section`

`

const SubmitSection = styled.section`

`

const AddQuestionButton = styled.button`

`

const SubmitQuestions = styled.button`

`

const GroupNameInput = styled.input`

`

const SavedUpdatedQuestion = styled.button`

`

const CancelUpdatedQuestion = styled.button`

`

interface IProps {
    addedQuestions: Array<QuestionsData>
    newQuestion: QuestionsData,
    groupName: string,
    submitQuestions: () => void,
    saveQuestion: () => void,
    changeName: (e: any) => void,
    optionChange: (e: any) => void,
    categoryChange: (e: any) => void,
    groupNameChange: (e: any) => void,
    correctHandler: (e: any) => void,
    optionExplanation: (e: any) => void,
    deleteQuestion: (id: number) => void,
    editQuestion: (id: number) => void,
    currentlyEditing: boolean,
    updateQuestion: (id: number) => void,
    cancelUpdate: (id: number) => void
}

const QuestionsView = ({newQuestion, saveQuestion, changeName, optionChange, addedQuestions, categoryChange, groupNameChange, correctHandler, optionExplanation, groupName, submitQuestions, deleteQuestion, editQuestion, currentlyEditing, updateQuestion, cancelUpdate}: IProps) => {

    return (
        <MainContainer>
            <HeadingSection>
                <Heading>{currentlyEditing && newQuestion !== undefined ? `Currently Editing: ${newQuestion.name}`: "Add Questions"}</Heading>
            </HeadingSection>
            <FormsSection>
                {currentlyEditing && newQuestion !== undefined ? <React.Fragment><QuestionCrud optionExplanation={optionExplanation} correctHandler={correctHandler} categoryChange={categoryChange} optionChange={optionChange} changeName={changeName} questionData={newQuestion}/><SavedUpdatedQuestion onClick={() => updateQuestion(newQuestion.id)}>Update!</SavedUpdatedQuestion><CancelUpdatedQuestion onClick={() => cancelUpdate(newQuestion.id)}>Cancel</CancelUpdatedQuestion></React.Fragment> : <React.Fragment><GroupNameInput onChange={groupNameChange} value={groupName} placeholder={"Group Name"} />
                {addedQuestions.length !== 0 ? addedQuestions.map((question: QuestionsData) => {
                    return <QuestionOverview editQuestion={editQuestion} deleteQuestion={deleteQuestion} key={question.id} questionsData={question}/>
                }) : null}
                    <QuestionCrud optionExplanation={optionExplanation} correctHandler={correctHandler} categoryChange={categoryChange} optionChange={optionChange} changeName={changeName} questionData={newQuestion}/>
                    <AddQuestionButton onClick={saveQuestion}>Add Question</AddQuestionButton></React.Fragment> }

            </FormsSection>
            <SubmitSection>
                <SubmitQuestions onClick={submitQuestions}>Submit</SubmitQuestions>
            </SubmitSection>
        </MainContainer>
    );
};

export default QuestionsView;
