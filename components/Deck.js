import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
// import { receiveEntries, addEntry } from '../actions'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.deck.title}`
    }
  }

  render() {
    const { deck } = this.props.navigation.state.params
    return (
      <View style={styles.deck}>
        <Text style={{fontSize: 20}}>
          { deck.title }
        </Text>
        <Text style={styles.deck_cards}>
          { deck.questions.length } { deck.questions.length === 1 ? 'card' : 'cards' }
        </Text>
        <TouchableOpacity style={[styles.button, {backgroundColor: 'white', marginTop: 40}]} onPress={() => console.log('clicked!')}>
          <Text style={{ color: 'black' }}> Add Card </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]} onPress={() => console.log('clicked!')}>
          <Text style={{ color: 'white' }}> Start Quiz </Text>
        </TouchableOpacity>
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

export default connect()(Deck)
