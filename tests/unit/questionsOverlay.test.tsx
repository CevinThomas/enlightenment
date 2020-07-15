import 'react-native';
import React from 'react';
import QuestionsOverlay from '../../src/components/questionOverlay';
import renderer from 'react-test-renderer';

test('QuestionsOverlay Component Renders', () => {
    const tree = renderer.create(
        <QuestionsOverlay/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
