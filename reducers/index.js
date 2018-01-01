import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks (state = [], action) {
  switch (action.type) {
    case RECEIVE_DECKS :
    return [...state, ...action.decks]
    case ADD_DECK :
      return [...state, { title: action.title, questions: [] }]
    case ADD_CARD :
      return [...state].map((deck) => {
        if(deck.title === action.card.title) {
          deck.questions.push({question: action.card.question, answer: action.card.answer});
          return deck;
        }
        return deck;
      })
    default :
      return state
  }
}

export default decks
