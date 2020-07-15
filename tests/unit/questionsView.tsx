import 'react-native';
import React from 'react';
import QuestionView from '../../src/components/questionView';

import renderer from 'react-test-renderer';

test('QuestionView Component Renders', () => {
    const tree = renderer.create(
        <QuestionView/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
