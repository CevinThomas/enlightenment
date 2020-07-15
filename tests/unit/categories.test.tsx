import 'react-native';
import React from 'react';
import Categories from '../../src/views/categories';

import renderer from 'react-test-renderer';

test('Categories View Renders', () => {
    const tree = renderer.create(
        <Categories/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
