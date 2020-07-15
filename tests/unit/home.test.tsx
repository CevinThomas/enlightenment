import 'react-native';
import React from 'react';
import Home from '../../src/views/home';

import renderer from 'react-test-renderer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('Home View Renders', () => {
    const tree = renderer.create(
        <Home/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
