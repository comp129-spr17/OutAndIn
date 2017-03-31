import 'react-native';
import React from 'react';
import MainComponent from '../apps/components/MainComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <MainComponent />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
