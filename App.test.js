// @flow

import 'react-native';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import App from './App';

import renderer from 'react-test-renderer';

test('renders correctly jest react test renderer', () => {
  const tree = renderer.create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renderd correctly with toJSON', () => {
  const component = shallow(<App />);
  const tree = toJSON(component);
  expect(tree).toMatchSnapshot;
});

test('renders as expected', () => {
  const component = shallow(<App />)
  expect(component.contains('Open up App.js to start working on your app')).toBe(true);
});
