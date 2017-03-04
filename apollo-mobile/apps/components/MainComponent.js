'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, TouchableOpacity, View } from 'react-native';
/*import url('https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i');*/

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
var dataArray=[];
class MainComponent extends Component
{
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      message: '',
      dataSource: ds.cloneWithRows(dataArray)
    };
  }

  render() {
    return (
      <View style={styles.ViewContainer}>
        <ListView dataSource = {this.state.dataSource}
                  enableEmptySections = {true}
                  style = {styles.listMessage}
                  renderRow = {
                    (rowData) =>
                      <View style={styles.message}>
                        <Text>{rowData}</Text>
                      </View>
                  }
        />
      </View>
    )
  }
}

const styles  = StyleSheet.create({
  ViewContainer:
  {
    height:70,
    flexDirection: "column", /*top to bottom*/
    //justifyContent: "flex-start", /*start at the top*/
    alignItems: "stretch", /*all components take up full width*/
    backgroundColor: '#164762'
  },
  Logo:
  {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    marginTop: 20
  },
  container:
  {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column'
  },
  listMessage:
  {
    flex: 13,
    paddingLeft: 5,
    paddingRight:5
  },
  message:
  {
    paddingTop: 5,
    paddingRight:5,
    paddingLeft:5
  }
})

module.exports = MainComponent
