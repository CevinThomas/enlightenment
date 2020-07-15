import 'react-native';
import React from 'react';
import Categories from '../../src/views/categories';

import renderer from 'react-test-renderer';
import {shallow} from "enzyme";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BottomBarLogo from "../../src/components/bottomBarLogo";


Enzyme.configure({adapter: new Adapter()});


test('Categories View Renders', () => {
    const tree = renderer.create(
        <Categories/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Has BottomBarLogo", () => {
    const wrapper = shallow(<Categories/>);
    expect(wrapper.find(BottomBarLogo)).toHaveLength(1);
});
