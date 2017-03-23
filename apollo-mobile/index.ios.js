'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, TouchableOpacity, View, Navigator } from 'react-native';
import MainComponent from './apps/components/MainComponent'
import LoginPage from './apps/components/LoginPage'

class Apollo extends Component {
  render() {
    return (
      <Navigator initialRoute = {{id: 'landing'}}
                 renderScene = {this.navigatorRenderScene} />
    );
  }

  navigatorRenderScene(route, navigator)
  {
    switch(route.id)
    {
      case 'landing':
        return(<LoginPage navigator = {navigator}/>);
      case 'mainChat':
        return(<MainComponent navigator = {navigator} />);
    }
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
