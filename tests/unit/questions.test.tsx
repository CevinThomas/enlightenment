import 'react-native';
import React from 'react';
import Questions from '../../src/views/questions';
import Enzyme from "enzyme";

import renderer from 'react-test-renderer';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('Questions View Renders', () => {
    const tree = renderer.create(
        <Questions/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
