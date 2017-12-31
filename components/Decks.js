import React, { Component } from 'react'
import { View, Text } from 'react-native'
// import { connect } from 'react-redux'
// import { receiveEntries, addEntry } from '../actions'
import { fetchDecks } from '../utils/api'

export default class Decks extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    const { dispatch } = this.props

    fetchDecks()
      .then((decks) => console.log(decks))
  }

  render() {
    const { decks } = this.props

    return (
      <View>
        <Text>Hello World</Text>
      </View>
    )
  }
}
