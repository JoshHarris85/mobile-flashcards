import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

class Score extends Component {
  state = {
    showAnswer: false,
    answered: 0,
    question_index: 0
  }

  updateAnswer = () => {
    this.setState(() => {
      const state = this.state
      const answered = state.answered
      const question_index = state.question_index
      const { deck } = this.props.navigation.state.params

      return {
        ...state,
        answered: state.answered < deck.questions.length ? answered + 1 : answered,
        question_index: question_index + 1 < deck.questions.length ? question_index + 1 : question_index,
        showAnswer: false
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

  updateQuestionIndex = () => {
    this.setState(() => {
      const state = this.state
      const question_index = state.question_index
      const { deck } = this.props.navigation.state.params
      return {
        ...state,
        question_index: question_index + 1 < deck.questions.length ? question_index + 1 : question_index,
        showAnswer: false
      }
    });
  }

  render() {
    const { deck } = this.props.navigation.state.params;
    const { state } = this;
    const { questions } = deck;
    let current_question = questions[state.question_index];
    console.log(state)

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
          onPress={() => this.updateQuestionIndex()}
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

export default connect()(Score)
