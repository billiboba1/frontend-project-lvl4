import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import chatSlice from './modules/chat/api/chatSlice';
import {addChannel, removeChannel, sendMessage, chooseChannel, showModal} from './modules/chat/api/chatSlice';

const initialState = {
  path: '/',
  token: '',
  username: '',
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { username, token } = action.payload;
      state.token = token;
      state.username = username;
    },
    logOut: (state) => {
      state.token = '';
      state.usernme = '';
    },
    toLogin: (state) => state.path = 'login',
    toChat: (state) => state.path = '/',
    toError: (state) => state.path = '404',
  },
});

const reducer = combineReducers({
  chat: chatSlice,
  main: mainSlice.reducer,
});

const store = configureStore({reducer});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

export default mainSlice.reducer;
export const { logIn, logOut, toLogin, toChat, toError } = mainSlice.actions;
