'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

export default class LoginPage extends Component
{
  render(){
    return(
      <ScrollView>
      <View>
        <Text style = {styles.textLabel}>Username or Email</Text>
        <TextInput style = {styles.textInput}/>
      </View>

      <View>
        <Text style = {styles.textLabel}>Password</Text>
        <TextInput style = {styles.textInput}/>
      </View>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  textLabel:
  {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Verdana',
    marginBottom: 10,
  },

  textInput:
  {
    flex: 8,
    borderWidth: 1,
    borderColor: '#164762',
    paddingLeft: 5
  }

})
