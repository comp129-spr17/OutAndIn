'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

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
        <View style = {styles.headerBar}>
          <Text style={styles.username}> Maxine Lien </Text>
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
        <View style = {styles.bigContainer}>
          <View style={styles.containerInput}>
            <TextInput style={styles.inputMessage}
                      onChangeText={text => this.setState({message: text})}
                      value={this.state.message}
            />
          </View>
          <View style = {styles.containerInput}>
            <Icon name = "paperclip" size = {20} style = {styles.icons} />
          </View>
        </View>
      </View>
    )
  }
}

const styles  = StyleSheet.create({
  headerBar:
  {
    height:70,
    backgroundColor: '#F8F8F8'
  },
  username:
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
  bigContainer: {
    height:80,
    //flexDirection: 'row'
  },
  containerInput: {
    height:40,
    flexDirection: 'row',
    alignItems:'stretch'
  },
  inputMessage: {
    flex: 8,
    borderWidth: 1,
    borderColor: '#EDEDED',
    paddingLeft: 5
  },
  icons:{
    color: '#164762',
    width:20,
    height:20
  }

})

module.exports = MainComponent
