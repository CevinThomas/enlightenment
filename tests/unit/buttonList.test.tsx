import 'react-native';
import React from 'react';
import ButtonList from '../../src/components/buttonList';
import {shallow} from "enzyme";

import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Text} from "react-native";

Enzyme.configure({adapter: new Adapter()});


test('ButtonList Component Renders', () => {
    const tree = renderer.create(
        <ButtonList/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test("test", () => {
    const wrapper = shallow(
        <ButtonList boxTitle={"Title"}/>
    );
    expect(wrapper.find(Text).contains("Title")).toBeTruthy();

});


