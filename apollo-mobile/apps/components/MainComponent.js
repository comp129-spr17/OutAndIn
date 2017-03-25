'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Logo}> Apollo </Text>
        </View>
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
        <View style={styles.containerInput}>
          <TextInput style={styles.inputMessage}
                     onChangeText={text => this.setState({message: text})}
                     value={this.state.message}
          />
          <TouchableOpacity style={styles.buttonSend}>
            <Text style = {styles.send}> SEND </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles  = StyleSheet.create({
  send:
  {
    color: 'white',
    fontWeight: 'bold',
    //fontFamily: 'FontAwesome'
  },
  header:
  {
    height:70,
    //flexDirection: "column", /*top to bottom*/
    //justifyContent: "flex-start", /*start at the top*/
    //alignItems: "stretch", /*all components take up full width*/
    backgroundColor: '#F8F8F8'
  },
  Logo:
  {
    textAlign: 'center',
    color: '#424242',
    fontSize: 16,
    marginTop: 30
  },
  container:
  {
    //marginTop: 20,
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
  },
  containerInput: {
    height: 40,
    flexDirection: 'row',
  },
  inputMessage: {
    flex: 8,
    borderWidth: 1,
    borderColor: '#164762',
    paddingLeft: 5
  },
  buttonSend: {
    flex: 2,
    backgroundColor: '#164762',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

module.exports = MainComponent
