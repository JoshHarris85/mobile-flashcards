import { AsyncStorage } from 'react-native'
import { formatData, DECKS_STORAGE_KEY } from './_init_data'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatData);
}

export function getDeck(title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
    return JSON.parse(decks).filter((deck) => (
      deck.title === title;
    ));
  });
}

export function saveDeckTitle (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data.push({ title: title, questions: [] });

      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    });
  }

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      let decks = JSON.parse(results).filter((deck) => {
        if(title === deck.title) {
          deck.questions.push(card);
          return deck;
        }
        return deck;
      });

      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    });
}
