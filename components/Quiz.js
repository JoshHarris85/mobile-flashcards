import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  state = {
    showAnswer: false,
    allAnswered: false,
    answered: 0,
    attempted: 0,
    question_index: 0
  }

  resetQuiz = () => {
    this.setState({
      showAnswer: false,
      allAnswered: false,
      answered: 0,
      attempted: 0,
      question_index: 0
    })
  }

  updateAnswer = () => {
    this.setState(() => {
      const state = this.state
      const answered = state.answered
      const question_index = state.question_index
      const attempted = state.attempted
      const { deck } = this.props.navigation.state.params

      return {
        ...state,
        answered: answered < deck.questions.length ? answered + 1 : answered,
        question_index: question_index + 1 < deck.questions.length ? question_index + 1 : question_index,
        showAnswer: false,
        attempted: attempted < deck.questions.length ? attempted + 1 : attempted,
        allAnswered: attempted + 1 === deck.questions.length ? true : false
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
      const attempted = state.attempted
      const { deck } = this.props.navigation.state.params

      return {
        ...state,
        question_index: question_index + 1 < deck.questions.length ? question_index + 1 : question_index,
        showAnswer: false,
        attempted: state.attempted < deck.questions.length ? attempted + 1 : attempted,
        allAnswered: attempted + 1 === deck.questions.length ? true : false
      }
    });
  }

  render() {
    const { deck } = this.props.navigation.state.params;
    const { state } = this;
    const { questions } = deck;
    let current_question = questions[state.question_index];

    if (questions.length < 1) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>
            There are no questions for this deck yet.
          </Text>
        </View>
      )
    }

    if (state.allAnswered && questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>
            Score: {`${Math.round((state.answered / questions.length) * 100)} %`}
          </Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'black'}]}
            onPress={() => this.resetQuiz()}
          >
            <Text style={{ color: 'white' }}> Restart Quiz </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'black'}]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={{ color: 'white' }}> Back to Deck </Text>
          </TouchableOpacity>
        </View>
      )
    }

    if (!state.allAnswered && questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.questions}>
            <Text style={styles.header}>
              {`${state.attempted}/${questions.length}`}
            </Text>
          </View>
          <View style={styles.container}>
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
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignSelf: 'stretch',
   justifyContent: 'center',
   padding: 30
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
  },
  questions: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})

export default connect()(Quiz)
