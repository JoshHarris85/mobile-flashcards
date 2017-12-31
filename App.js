import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import { TabNavigator } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='add-circle-outline' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#2277aa' : '#fff',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? '#fff' : '#2277aa',
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <Tabs />
        </View>
      </Provider>
    )
  }
}
