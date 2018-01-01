import React, { Component } from 'react'
import { Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  checkIfEmpty = () => {
    if (this.state.question.length < 1 || this.state.answer.length < 1) {
      alert('You must enter both a question and an answer');
      return true;
    }
    return false;
  }

  submit = () => {
    if(this.checkIfEmpty()) return;
    const { deck } = this.props.navigation.state.params
    const { question, answer } = this.state;
    // Add the card to redux
    this.props.addCard({title: deck.title, question, answer});
    // Add data to AsyncStorage
    addCardToDeck(deck.title, {question, answer});
    // Reset local state
    this.setState({question: '', answer: ''});
    // Navigate to current deck
    this.props.decks.filter((current_deck) => {
      if(current_deck.title === deck.title) return this.props.navigation.goBack()
    })
  }

  render() {
    const { deck } = this.props.navigation.state.params

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.header}>
          Question:
        </Text>
        <TextInput
          style={styles.input}
          nderlineColorAndroid="black"
          defaultValue={this.state.question}
          onChangeText={(question) => this.setState({question: question})}
        />
        <Text style={styles.header}>
          Answer:
        </Text>
        <TextInput
          style={styles.input}
          nderlineColorAndroid="black"
          defaultValue={this.state.answer}
          onChangeText={(answer) => this.setState({answer: answer})}
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
    padding: 10,
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
  addCard: (card) => dispatch(addCard(card))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard)
