'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, Image, Navigator, TouchableOpacity, View, ScrollView } from 'react-native';
import{ StackNavigator } from 'react-navigation'


export default class LoginPage extends Component
{
  static navigationOptions = {
    //title: 'LoginPage',
    header: {
      visible: false,
    }
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
      <View>
        <View style={styles.headerBar}>
          <Image source={require('../../Img/logo.png')} style={styles.logoPic}/>
          <Text> Apollo </Text>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  logoPic:
  {
    marginTop: 15,
    width: 18,
    height: 36,
  },
  headerBar:
  {
    height:70,
    backgroundColor: '#164762',
    alignItems: 'center'
  },
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
