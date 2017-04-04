'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, TouchableOpacity, View, Navigator } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import MainComponent from './apps/components/MainComponent'
import LoginPage from './apps/components/LoginPage'
import ChatList from './apps/components/ChatList'


//class Apollo extends Component {
  //static navigationOptions = {
    //title: 'Login',
  //};

  //render() {
    //return (

  //  );

//  }
//}
const Apollo = StackNavigator({
  //Login: { screen: LoginPage },
  //mainChat: {screen: MainComponent},
  chatList: {screen: ChatList}
});

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
})

AppRegistry.registerComponent('Apollo', () => Apollo)
