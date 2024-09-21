import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit";
import {reducer} from "../reducers/reducer";

const reducers = combineReducers({
    state: reducer
})

export const store = configureStore({reducer: reducers})