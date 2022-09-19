import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from './movieSlice'

const reducer = combineReducers({
  [movieSlice.name]: movieSlice.reducer
});

const store = configureStore({ reducer });

export default store;