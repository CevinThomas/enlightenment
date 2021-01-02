import 'react-native';
import React from 'react';
import BottomBarLogo from '../../src/components/bottomBarLogo';

import renderer from 'react-test-renderer';

test('BottomBarLogo Component Renders', () => {
    const tree = renderer.create(
        <BottomBarLogo/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
