import React from 'react';
import {QuestionsData} from "../../interfaces/questionsData";
import styled from "styled-components";
import {Link} from "react-router-dom"

interface IProps {
    fetchedQuestions: Array<QuestionsData>
}

const Container = styled.main`

`

const QuestionContainer = styled.div`

`

const QuestionButton = styled.button`

`

const AllQuestionsView = ({fetchedQuestions}: IProps) => {

    return (
        <Container>
            {fetchedQuestions.map(questions => {
                return <QuestionContainer key={questions._id}><Link to={`/edit-question/${questions._id}`}>{questions.name}</Link></QuestionContainer>
            })}
        </Container>
    );
};

export default AllQuestionsView;
