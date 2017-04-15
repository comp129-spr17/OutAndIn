'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, TouchableOpacity, View, Navigator, Platform } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import { Navigation } from 'react-native-navigation';
import MainComponent from './apps/components/MainComponent'
import HomePage from './apps/components/HomePage'
import ChatList from './apps/components/ChatList'
import MainScreenNavigator from './apps/components/ChatList'
import LoginPage from './apps/components/LoginPage'
import RegisterPage from './apps/components/RegisterPage'

Navigation.registerComponent('MainComponent', () => MainComponent);
Navigation.registerComponent('HomePage', () => HomePage);
Navigation.registerComponent('LoginPage', () => LoginPage);
Navigation.registerComponent('RegisterPage', () => RegisterPage);
Navigation.registerComponent('ChatList', () => ChatList);


//Navigation.startSingleScreenApp({
//    screen: 'HomePage',
//  }
//});
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
  Greeting: { screen: HomePage },
  Login: {screen: LoginPage},
  Register: {screen: RegisterPage},
  mainChat: {screen: MainComponent},
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
