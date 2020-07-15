import 'react-native';
import React from 'react';
import Score from '../../src/components/score';
import renderer from 'react-test-renderer';

test('Score Component Renders', () => {
    const tree = renderer.create(
        <Score/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
