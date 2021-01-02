import 'react-native';
import React from 'react';
import Categories from '../../src/views/categories';
import renderer from 'react-test-renderer';
import BottomBarLogo from "../../src/components/bottomBarLogo";
import {render} from "react-native-testing-library";
import {Text} from "react-native";

test('Categories View Renders', () => {
    const tree = renderer.create(
        <Categories/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Should have a BottomBarLogo", () => {
    const component = render(<Categories/>);
    const bottomComp = component.getByA11yLabel("BottomBarLogo");
    expect(bottomComp).toBeTruthy();
});


