'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, Image, Navigator, TouchableOpacity, View, ScrollView } from 'react-native';
import{ StackNavigator, TabNavigator } from 'react-navigation'
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import Tabs from 'react-native-tabs';

export default class ChatList extends Component
{
  static navigationOptions = {
    tabBar: {
      label: 'Home',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ tintColor }) => (
        <Icon name = "paperclip" size = {20} style = {styles.icons} />
      ),
    },
  }

  constructor(props){
    super(props);
    this.state = {page:'home'};
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
          <View style = {{height: 80, backgroundColor: 'white', justifyContent: 'center'}}>
            <Text style = {styles.titleFont}> Place holderrr </Text>
          </View>



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



//tab navigation stuff... i dont think this is how to do it?? confused

class SearchScreen extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ tintColor }) => (
        <Icon name = "paperclip" size = {20} style = {styles.icons} />
      ),
    },
  }

  render() {
    return <Text>Search stuff</Text>
  }
}

class FriendsScreen extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ tintColor }) => (
        <Icon name = "paperclip" size = {20} style = {styles.icons} />
      ),
    },
  }

  render() {
    return <Text>list of all my friendss</Text>
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ tintColor }) => (
        <Icon name = "paperclip" size = {20} style = {styles.icons} />
      ),
    },
  }

  render() {
    return <Text>My profileee</Text>
  }
}

const MainScreenNavigator = TabNavigator({
  Home: { screen: ChatList },
  Search: { screen: SearchScreen },
  Friends: {screen: FriendsScreen },
  Profile: {screen: ProfileScreen },
},
{
tabBarOptions: {
  activeTintColor: '#e91e63',
},
});
