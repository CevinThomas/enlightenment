import React from "react";
import renderer from "react-test-renderer";
import QuestionView from "../../src/components/questionView";


test( "QuestionsView Component Renders", () => {
    const tree = renderer.create(
        <QuestionView/>
    ).toJSON();
    expect( tree ).toMatchSnapshot();
} );
