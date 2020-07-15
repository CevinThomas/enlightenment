import 'react-native';
import React from 'react';
import ModalRemoveQuestions from '../../src/components/modalRemoveQuestions';

import renderer from 'react-test-renderer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('ModalRemoveQuestions Component Renders', () => {
    const tree = renderer.create(
        <ModalRemoveQuestions/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
