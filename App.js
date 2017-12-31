import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Decks from './components/Decks'
import NewDeck from './components/Decks'
import { TabNavigator } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const Tabs = TabNavigator({
  History: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  AddEntry: {
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
      <View style={{flex: 1}}>
        <Tabs />
      </View>
    )
  }
}
