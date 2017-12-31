import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class NewDeck extends Component {
  render() {
    const { decks } = this.props

    return (
      <View style={styles.center}>
        <Text>New Deck</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
