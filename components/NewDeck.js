import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

class NewDeck extends Component {
  state = {
    title: ''
  }

  checkIfEmpty = () => {
    if (this.state.title.length < 1) {
      alert('You must enter a title');
      return true;
    }
    return false;
  }

  checkIfUsed = () => {
    if((this.props.decks.filter((deck) => deck.title === this.state.title)).length){
      alert('Deck name has been used');
      return true;
    }
    return false;
  }

  submit = () => {
    if(this.checkIfUsed() || this.checkIfEmpty()) return;
    const { title } = this.state;
    // Add the deck to redux
    this.props.addDeck(title);
    // Add data to AsyncStorage
    saveDeckTitle(title);
    // Reset local state
    this.setState({title: ''});
    // Navigate to new deck
    this.props.navigation.navigate('Deck', { deck: {title: title, questions: []} })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
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
      </KeyboardAvoidingView>
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

function mapStateToProps (decks) {
  return {
    decks
  }
}

const mapDispatchToProps = (dispatch) => ({
  addDeck: (title) => dispatch(addDeck(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeck)
