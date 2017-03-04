'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, AppRegistry, Text, Navigator } from 'react-native';
import MainComponent from './apps/components/MainComponent'

class Apollo extends Component {
  render() {
    return (
      <MainComponent>
      <View style={{flex: 1}}>
<View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}><Text>My fixed footer</Text></View>
</View>
      </MainComponent>
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
