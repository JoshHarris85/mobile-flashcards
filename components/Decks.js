import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { connect } from 'react-redux'
// import { receiveEntries, addEntry } from '../actions'
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class Decks extends Component {
  componentWillMount () {
    fetchDecks()
      .then((decks) => this.props.dispatch(receiveDecks(decks)))
  }

  render() {
    const { decks } = this.props
    console.log(decks.map((deck) => { return deck }))
    return (
      <View style={styles.center}>
        <Text>
          {decks.map((deck) => { return deck.title })}
        </Text>
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
)(Decks)
