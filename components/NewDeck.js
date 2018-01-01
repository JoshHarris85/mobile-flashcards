import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { getDeck, saveDeckTitle } from '../utils/api'

class NewDeck extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const { title } = this.state;
    // Add the deck to redux
    this.props.addDeck(title);
    // Add data to AsyncStorage
    saveDeckTitle(title);
    // Reset local state
    this.setState({title: ''});

    // Navigate away to the deck
    getDeck(title).then((deck) =>
      console.log(deck)
      // this.props.navigation.navigate('Deck', { deck: deck })
    );
  }

  render() {
    const { decks } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.input}
          nderlineColorAndroid="black"
          onChangeText={(text) => this.setState({title: text})}
          placeholder='Deck Title'
          defaultValue={this.state.title}
        />
        <TouchableOpacity style={styles.button} onPress={this.submit}>
          <Text style={{ color: 'white' }}> Submit </Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignSelf: 'stretch',
   justifyContent: 'center',
   padding: 30
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    padding: 40,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 40,
    padding: 15,
    borderRadius: 10
  }
})

const mapStateToProps = (state, props) => ({
  decks: state.decks
});

const mapDispatchToProps = (dispatch) => ({
  addDeck: (title) => dispatch(addDeck(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeck)
