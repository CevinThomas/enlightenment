import 'react-native';
import React from 'react';
import Home from '../../src/views/home';
import renderer from 'react-test-renderer';
import {render} from "react-native-testing-library";
import BottomBarLogo from "../../src/components/bottomBarLogo";

test('Home View Renders', () => {
    const tree = renderer.create(
        <Home/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Should have a BottomBarLogo", () => {
    const component = render(<Home/>);
    const bottomComp = component.getByA11yLabel("BottomBarLogo");
    expect(bottomComp).toBeTruthy();
});
