'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, Image, Navigator, TouchableOpacity, View, ScrollView } from 'react-native';
import{ StackNavigator } from 'react-navigation'
import CheckBox from 'react-native-checkbox'

export default class RegisterPage extends Component
{
  static navigationOptions = {
    //title: 'RegisterPage',
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
          <View style = {styles.box}>
            <Text style = {styles.textLabel}> Email </Text>
            <TextInput style = {styles.textInput}/>
            <Text style = {styles.textLabel}> Full Name </Text>
            <TextInput style = {styles.textInput}/>
            <Text style = {styles.textLabel}> Username </Text>
            <TextInput style = {styles.textInput}/>
            <Text style = {styles.textLabel}> Password </Text>
            <TextInput style = {styles.textInput} secureTextEntry = 'true'/>
            <CheckBox label = 'I agree to the terms and conditions of this service'
                      checkboxStyle={{width:15, height: 15}}
                      labelStyle = {{fontSize: 11}}/>
            <TouchableOpacity onPress = {() => navigate('chatList')} style = {{paddingTop: 30}}>
              <View style = {styles.button}>
                <Text style = {{color: 'white', fontSize: 16}}> Log In </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Image>

    )
  }
}

const styles = StyleSheet.create({
  button:
  {
      height: 35,
      width: 320,
      backgroundColor: '#164762',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
  },
  box:
  {
      //flex: 3,
      height: 479,
      width: 345,
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: '#95989A',
      justifyContent: 'center',
      alignItems: 'center'
  },

  container:
  {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },

  textLabel:
  {
    fontSize: 16,
    //fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#7A7A7A',
    paddingBottom: 10,
  },

  textInput:
  {
    paddingLeft: 10,
    //width: 315,
    height: 30,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 10,
  }
})
