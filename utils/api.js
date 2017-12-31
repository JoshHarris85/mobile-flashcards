import { AsyncStorage } from 'react-native'
import { setInitialData, DECKS_STORAGE_KEY } from './_init_data'

export function fetchDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(setInitialData)
}
