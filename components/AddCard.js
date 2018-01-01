import React, { Component } from 'react'
import { Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
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
        />
        <Text style={styles.header}>
          Answer:
        </Text>
        <TextInput
          style={styles.input}
          nderlineColorAndroid="black"
          defaultValue={this.state.answer}
        />
        <TouchableOpacity style={styles.button}>
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

export default connect()(AddCard)
