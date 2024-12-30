import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { reducer } from '../reducers/reducer';
import { StateType } from 'typesafe-actions';

const reducers = combineReducers({
  game: reducer,
});

export const store = configureStore({ reducer: reducers });

export type RootState = StateType<typeof reducers>;
