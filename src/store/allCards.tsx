import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type CardType = {
  name: string,
  number: string,
  validity: {
    month: number,
    year: number,
  },
  cvv:string,
  isFreeze: boolean,
}

export type CardStateType = {
  currentCard: string;
  allCards: CardType[];
}

const initialCards = [
  {
    name: 'Robert John Downey',
    number: '8767354682930877',
    validity: {
      month: 12,
      year: 2027,
    },
    cvv:'322',
    isFreeze: false,
  },
  {
    name: 'Christopher Robert Evans',
    number: '8965654678945611',
    validity: {
      month: 12,
      year: 2026,
    },
    cvv:'124',
    isFreeze: true,
  },
  {
    name: 'Mark Alan Ruffalo',
    number: '8899337744663300',
    validity: {
      month: 4,
      year: 2028,
    },
    cvv:'321',
    isFreeze: true,
  },
]

const initialState: CardStateType = {
  currentCard: initialCards[0].number,
  allCards: initialCards}

export const allCards = createSlice({
  name: 'allCards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardType>) => {
      state.allCards = [...state.allCards, action.payload];
    },
    toggleFreeze: (state) => {
      const allCards = JSON.parse(JSON.stringify(state.allCards)) as CardType[];
      const index = allCards.findIndex((card) => card.number === state.currentCard);
      allCards[index].isFreeze = !allCards[index].isFreeze;
      state.allCards = allCards; 
    },
    deleteCard: (state) => {
      state.allCards = state.allCards.filter((card) => card.number !== state.currentCard);
    },
    changeCurrentCard: (state, action: PayloadAction<string>) => {
      state.currentCard = action.payload;
    },  
  },
})

export const allCardsAction = allCards.actions
export default allCards.reducer