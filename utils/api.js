import { AsyncStorage } from 'react-native'
import { formatData, DECKS_STORAGE_KEY } from './_init_data'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatData)
}

export function getDeck(title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
    return JSON.parse(decks).filter((deck) => (
      deck.title === title
    ));
  });
}

export function saveDeckTitle (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data.push({ title: title, questions: [] })
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
  }


// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck(title, card) {

}
