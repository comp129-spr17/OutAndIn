'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, Image, TouchableOpacity, View, ScrollView } from 'react-native';

export default class LoginPage extends Component
{
  render(){
    return(
      <Image source={require('../../Img/landing.jpg')} style = {styles.container}>
      <View>
        <Text style = {styles.textLabel}>Username or Email</Text>
        <TextInput style = {styles.textInput}/>
      </View>

      <View>
        <Text style = {styles.textLabel}>Password</Text>
        <TextInput style = {styles.textInput}/>
      </View>
      </Image>

    )
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    
    width: null,
    height: null,
    resizeMode: 'stretch'
  },

  textLabel:
  {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  textInput:
  {
    //flex: 8,
    borderWidth: 1,
    borderColor: '#164762',
    paddingLeft: 5
  }
})
