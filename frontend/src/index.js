import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import chatSlice from './modules/chat/api/chatSlice';
import {addChannel, removeChannel, sendMessage, chooseChannel, showModal} from './modules/chat/api/chatSlice';

const initialState = {
  path: '/',
  user: {},
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    login: (state) => state.path = 'login',
    chat: (state) => state.path = '/',
    error: (state) => state.path = '404',
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
