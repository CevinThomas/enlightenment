import 'react-native';
import React from 'react';
import QuestionsOverlay from '../../src/components/questionOverlay';

import renderer from 'react-test-renderer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('QuestionsOverlay Component Renders', () => {
    const tree = renderer.create(
        <QuestionsOverlay/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
