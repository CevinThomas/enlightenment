import React from "react";
import renderer from "react-test-renderer";
import QuestionView from "../../src/components/questionView";
import {render} from "react-native-testing-library";
import SeoQuestions from "../../src/questions/seoQuestions";
import Questions from "../../src/views/questions";
import javascriptQuestions from "../../src/questions/javascriptQuestions";
import {ProgrammingCategories} from "../../src/enums/programmingCategories";
import {IsAnswered} from "../../src/enums/isAnswered";
import {Modal, Text} from "react-native";
import ModalRemoveQuestions from "../../src/components/modalRemoveQuestions";

const fakeFunction = () => {
    return "hello";
};

test( "QuestionView View Renders", () => {
    const tree = renderer.create(
        <QuestionView/>
    ).toJSON();
    expect( tree ).toMatchSnapshot();
} );

test( "Should have a BottomBarLogo", () => {
    const component = render( <QuestionView/> );
    const bottomComp = component.getByA11yLabel( "BottomBarLogo" );
    expect( bottomComp ).toBeTruthy();
} );

test( "Should show correct number current question", () => {
    const component = render( <QuestionView allQuestions={javascriptQuestions} question={{
        question: "How do you declare a variable?",
        category: ProgrammingCategories.Language,
        answered: IsAnswered.no,
        options: [
            {
                choice: "Let, Const or Var =",
                isCorrect: true,
                explanation: "ES6 new way of declaring."
            },
            {
                choice: "Variable =",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "New Variable =",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Varr =",
                isCorrect: false,
                explanation: "This is incorrect due to ...",
            }
        ]
    }} counter={1} totalQuestions={5} scoreBoard={false}
                                            displayNextQuestion={fakeFunction}
                                            viewPreviousQuestion={fakeFunction}
                                            viewNextQuestion={fakeFunction}
                                            isNextQuestionViewable={fakeFunction}
    /> );
    const questionNumberText = component.queryByA11yLabel( "currentQuestionNumber" );
    console.log( questionNumberText.props );
} );
