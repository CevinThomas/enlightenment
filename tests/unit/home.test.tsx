import 'react-native';
import React from 'react';
import Home from '../../src/views/home';
import renderer from 'react-test-renderer';

test('Home View Renders', () => {
    const tree = renderer.create(
        <Home/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
