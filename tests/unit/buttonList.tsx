import 'react-native';
import React from 'react';
import ButtonList from '../../src/components/buttonList';

import renderer from 'react-test-renderer';

test('ButtonList Component Renders', () => {
    const tree = renderer.create(
        <ButtonList/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
