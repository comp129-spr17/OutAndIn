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
      <View style = {styles.container}>
        <View style={styles.headerBar}>
          <Image source={require('../../Img/logo.png')} style={styles.logoPic}/>
          <Text style = {styles.textLabel}> Apollo </Text>
        </View>
        <View>
          <View style = {styles.greyTitle}>
            <Text style = {styles.titleFont}> Online </Text>
          </View>
          <View style = {{justifyContent: 'center', backgroundColor: 'white', height: 40}}>
            <Text style = {styles.titleFont}> No friends online </Text>
          </View>
        </View>
        <View>
          <View style = {styles.greyTitle}>
            <Text style = {styles.titleFont}> Conversations </Text>
          </View>
          <ListView style = {{flex: 1, backgroundColor: 'white'}}>
            <Text style = {styles.titleFont}> Place holderrr </Text>
          </ListView>



        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  greyTitle:
  {
    height: 20,
    backgroundColor: '#F8F8F8',
  },
  titleFont:
  {
    color: '#7A7A7A'
  },
  textLabel:
  {
    fontSize: 26,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  logoPic:
  {
    //marginTop: 15,
    width: 18,
    height: 36,
  },
  headerBar:
  {
    flexDirection: 'row',
    height:70,
    backgroundColor: '#164762',
    justifyContent: 'center',
    alignItems:'center'
  },
  container:
  {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
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
})
