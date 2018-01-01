import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`
    }
  }

  render() {
    const { title } = this.props.navigation.state.params
    // Get deck from redux store since we cannot pass a param
    // when Navigating backwards
    let deck = this.props.decks.filter((deck) => {
      if(deck.title === title) return deck
    })[0]

    return (
      <View style={styles.deck}>
        <Text style={{fontSize: 20}}>
          { deck.title }
        </Text>
        <Text style={styles.deck_cards}>
          { deck.questions.length } { deck.questions.length === 1 ? 'card' : 'cards' }
        </Text>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'white', marginTop: 40}]}
          onPress={() => this.props.navigation.navigate('AddCard', { deck: deck })}
        >
          <Text style={{ color: 'black' }}> Add Card </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'black'}]}
          onPress={() => this.props.navigation.navigate('Quiz', { deck: deck })}
        >
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

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)(Deck)
