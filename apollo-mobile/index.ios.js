'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, AppRegistry, Text, Navigator } from 'react-native';
import ViewContainer from './apps/components/ViewContainer'

class Apollo extends Component {
  render() {
    return (
      <ViewContainer>
        <Text>Hellooo </Text>
      </ViewContainer>
    )
  }
}

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
})

AppRegistry.registerComponent('Apollo', () => Apollo)
