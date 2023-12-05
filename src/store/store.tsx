import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cardReducer from './allCards';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

const reducer = combineReducers({
  cards: cardReducer,
});

const store = configureStore ({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })  
});


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
