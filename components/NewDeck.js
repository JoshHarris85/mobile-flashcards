import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'

class NewDeck extends Component {
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
          onChangeText={(text) => console.log(text)}
          placeholder='Deck Title'
        />
        <TouchableOpacity style={styles.button} onPress={() => console.log('clicked!')}>
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

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)(NewDeck)
