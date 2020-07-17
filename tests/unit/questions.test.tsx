import 'react-native';
import React from 'react';
import Questions from '../../src/views/questions';
import renderer from 'react-test-renderer';
import {render} from "react-native-testing-library";
import Home from "../../src/views/home";

test('Questions View Renders', () => {
    const tree = renderer.create(
        <Questions/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


