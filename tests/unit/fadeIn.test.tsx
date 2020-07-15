import 'react-native';
import React from 'react';
import FadeIn from '../../src/components/fadeIn';

import renderer from 'react-test-renderer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('FadeIn Component Renders', () => {
    const tree = renderer.create(
        <FadeIn/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
