import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
  render() {
    return (
      <View style={styles.deck}>
        <Text style={{fontSize: 20}}>
          Hello World
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center'
  },
  deck: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  deck_cards: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'stretch'
  }
})

export default connect()(Quiz)
