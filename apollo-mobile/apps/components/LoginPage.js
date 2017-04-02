'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, Image, Navigator, TouchableOpacity, View, ScrollView } from 'react-native';
import{ StackNavigator } from 'react-navigation'


export default class LoginPage extends Component
{
  static navigationOptions = {
    //title: 'LoginPage',
    header: {
      visible: true
    }
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
      <Image source={require('../../Img/landing.jpg')} style = {styles.container}>
        <View style = {styles.container}>
          <Image source={require('../../Img/logo.png')}/>
          <Text style = {styles.textLabel}>Messaging Made Easy</Text>
          <View>
            <TouchableOpacity onPress = {() => navigate('chatList')}>
              <Text style = {styles.textLabel}>Login</Text>
            </TouchableOpacity>
            <TextInput style = {styles.textInput}/>
          </View>

          <View>
            <TouchableOpacity>
              <Text style = {styles.textLabel}>Register</Text>
            </TouchableOpacity>
            <TextInput style = {styles.textInput}/>
          </View>
        </View>
      </Image>

    )
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },

  textLabel:
  {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },

  textInput:
  {
    //flex: 8,
    borderWidth: 1,
    borderColor: '#164762',
    paddingLeft: 5
  }
})
