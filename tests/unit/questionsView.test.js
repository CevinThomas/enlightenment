import React from "react";
import renderer from "react-test-renderer";
import QuestionView from "../../src/components/questionView";
import {render} from "react-native-testing-library";
import Questions from "../../src/views/questions";


test( "QuestionsView Component Renders", () => {
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
