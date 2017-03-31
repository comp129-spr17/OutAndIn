import React from 'react';
import chat from '../../../src/components/Chat/index.js';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
      const tree = renderer.create(
    <chat />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});