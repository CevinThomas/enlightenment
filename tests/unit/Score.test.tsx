import 'react-native';
import React from 'react';
import Score from '../../src/components/score';

import renderer from 'react-test-renderer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('Score Component Renders', () => {
    const tree = renderer.create(
        <Score/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
