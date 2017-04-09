'use strict'

import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, ListView, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
var dataArray=[];
class MainComponent extends Component
{
  static navigationOptions = {
    //title: ({route}) => route.params.name,
  }

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      message: '',
      dataSource: ds.cloneWithRows(dataArray)
    };
  }

  render() {
    const { goBack } = this.props.navigation
    return (
      <View style={styles.container}>
        <ListView dataSource = {this.state.dataSource}
                  enableEmptySections = {true}
                  style = {styles.listMessage}
                  renderRow = {
                    (rowData) =>
                      <View style={styles.message}>
                        <Text style = {{ padding: 10, backgroundColor: rowData.color, color: 'white',}}>{rowData.message}</Text>
                      </View>
                  }
        />
        <View style = {styles.bigContainer}>
          <View style={styles.containerInput}>
            <TextInput style={styles.inputMessage}
                      onChangeText={text => this.setState({message: text})}
                      value={this.state.message}
                      //multiline={true}
                      onSubmitEditing={() => {this.emitMessage()}}
                      placeholder={'Type your message'}
                      enablesReturnKeyAutomatically = {true}
            />
          </View>
          <View style = {styles.containerInput}>
            <Icon name = "paperclip" size = {20} style = {styles.icons} />
            <Icon name = "microphone" size = {20} style = {styles.icons} />
            <Icon name = "camera" size = {20} style = {styles.icons} />
            <Icon name = "video-camera" size = {20} style = {styles.icons} />
          </View>
        </View>
      </View>
    )
  }

  emitMessage() {
        //this.socket.emit('onChat', this.state.message);
        this.appendMessage(this.state.message, '#164762');
        this.setState({
            message: '',
        });
    }
    appendMessage(message, color) {
        // color is for define user message color
        dataArray.push({
            message: message,
            color: color
        });
        this.setState({
            dataSource: ds.cloneWithRows(dataArray)
        });
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
    flexDirection: 'column',
    //alignItems: 'flex-end'
  },
  listMessage:
  {
    flex: 13,
    paddingLeft: 5,
    paddingRight:5,

  },
  message:
  {
    paddingTop: 5,
    paddingRight:5,
    paddingLeft:5,
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
    color: '#8A8A8A',
    paddingTop: 10,
    paddingLeft: 7,
    paddingRight: 10
  }

})

module.exports = MainComponent
