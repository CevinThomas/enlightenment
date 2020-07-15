import 'react-native';
import React from 'react';
import BottomBarLogo from '../../src/components/bottomBarLogo';

import renderer from 'react-test-renderer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('BottomBarLogo Component Renders', () => {
    const tree = renderer.create(
        <BottomBarLogo/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
