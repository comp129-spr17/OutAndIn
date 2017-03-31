import React from 'react';
import chat from '../../../src/components/login/index.js';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
    <login />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});