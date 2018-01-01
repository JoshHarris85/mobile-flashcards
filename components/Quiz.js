import React, { Component } from 'react'
import { Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'

class Quiz extends Component {
  state = {
    showAnswer: false,
    answered: 0
  }

  updateAnswer = () => {
    this.setState(() => {
      const state = this.state
      const answered = state.answered
      const { deck } = this.props.navigation.state.params

      return {
        ...state,
        answered: state.answered < deck.questions.length ? answered + 1 : answered
      }
    });
  }

  updateShowAnswer = () => {
    this.setState(() => {
      const state = this.state
      return {
        ...state,
        showAnswer: !state.showAnswer
      }
    });
  }

  render() {
    const { deck } = this.props.navigation.state.params;
    const { state } = this;
    const { questions } = deck;
    let current_question = questions[0];

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {`${state.answered}/${questions.length}`}
        </Text>
        <Text style={styles.header}>
          { state.showAnswer ? current_question.answer : current_question.question }
        </Text>
        <Text style={styles.text} onPress={() => this.updateShowAnswer()}>
          { state.showAnswer ? 'Answer' : 'Question' }
        </Text>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'green'}]}
          onPress={() => this.updateAnswer()}
        >
          <Text style={{ color: 'white' }}> Correct </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'red'}]}
          onPress={() => console.log('show next question')}
        >
          <Text style={{ color: 'white' }}> Incorrect </Text>
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
    padding: 10,
    textAlign: 'center'
  },
  text: {
    padding: 10,
    textAlign: 'center',
    color: 'red'
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
    margin: 10,
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
)(Quiz)
