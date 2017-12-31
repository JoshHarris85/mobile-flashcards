import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
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
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.title}
          data={this.props.decks}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => console.log('clicked!')} >
              <View style={styles.item}>
                <Text style={{fontSize: 20}}>
                  { item.title }
                </Text>
                <Text style={styles.item_cards}>
                  { item.questions.length } { item.questions.length === 1 ? 'card' : 'cards'}
                </Text>
                <View style={styles.line}/>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignSelf: 'stretch',
   padding: 30
  },
  item: {
    alignItems: 'center',
    padding: 25
  },
  item_cards: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center'
  },
  line: {
    paddingTop: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignSelf: 'stretch'
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
