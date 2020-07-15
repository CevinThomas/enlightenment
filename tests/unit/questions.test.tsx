import 'react-native';
import React from 'react';
import Questions from '../../src/views/questions';
import renderer from 'react-test-renderer';

test('Questions View Renders', () => {
    const tree = renderer.create(
        <Questions/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
