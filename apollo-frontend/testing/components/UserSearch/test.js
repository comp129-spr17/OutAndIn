import React from 'react';
import UserSearch from '../../../src/components/UserSearch/index.js';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
      const tree = renderer.create(
    <UserSearch />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});