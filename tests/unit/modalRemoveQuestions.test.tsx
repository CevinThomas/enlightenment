import 'react-native';
import React from 'react';
import ModalRemoveQuestions from '../../src/components/modalRemoveQuestions';
import renderer from 'react-test-renderer';

test('ModalRemoveQuestions Component Renders', () => {
    const tree = renderer.create(
        <ModalRemoveQuestions/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
