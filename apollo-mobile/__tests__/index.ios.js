import 'react-native';
import React from 'react';
import LoginPage from '../apps/components/LoginPage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <LoginPage />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
