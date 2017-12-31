import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class NewDeck extends Component {
  render() {
    const { decks } = this.props

    return (
      <View>
        <Text>New Deck</Text>
      </View>
    )
  }
}
