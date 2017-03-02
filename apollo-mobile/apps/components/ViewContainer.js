'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, AppRegistry, Text } from 'react-native';
/*import url('https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i');*/

class ViewContainer extends Component
{
  render() {
    return (
      <View style={styles.ViewContainer}>
        <Text style={styles.Logo}>
          Apollo
        </Text>
      </View>
    )
  }
}

const styles  = StyleSheet.create({
  ViewContainer:
  {
    height:70,
    flexDirection: "column", /*top to bottom*/
    justifyContent: "flex-start", /*start at the top*/
    alignItems: "stretch", /*all components take up full width*/
    backgroundColor: '#164762'
  },
  Logo:
  {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    marginTop: 20
  }
})

module.exports = ViewContainer
