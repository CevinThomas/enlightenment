import 'react-native';
import React from 'react';
import Categories from '../../src/views/categories';

import renderer from 'react-test-renderer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});


test('Categories View Renders', () => {
    const tree = renderer.create(
        <Categories/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Has BottomBarLogo", () => {

});
