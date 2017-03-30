import 'react-native';
import React from 'react';
import ChatList from '../apps/components/ChatList';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <ChatList />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
