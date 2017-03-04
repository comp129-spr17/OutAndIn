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
      <View style={styles.container}>
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
      </View>
    )
  }
}

const styles  = StyleSheet.create({
  send:
  {
    color: 'white',
    fontWeight: 'bold'
  },
  ViewContainer:
  {
    height:70,
    //flexDirection: "column", /*top to bottom*/
    //justifyContent: "flex-start", /*start at the top*/
    //alignItems: "stretch", /*all components take up full width*/
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
  },
  containerInput: {
    flex: 1,
    flexDirection: 'row',
  },
  inputMessage: {
    flex: 8,
    bottom: 0,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#46b8da',
    width: 1000,
    height: 30
  },
  buttonSend: {
    flex: 2,
    bottom:0,
    right:0,
    position: 'absolute',
    height: 30,
    backgroundColor: '#164762',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

module.exports = MainComponent
