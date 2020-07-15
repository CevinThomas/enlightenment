import 'react-native';
import React from 'react';
import FadeIn from '../../src/components/fadeIn';

import renderer from 'react-test-renderer';

test('FadeIn Component Renders', () => {
    const tree = renderer.create(
        <FadeIn/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
