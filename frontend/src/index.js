import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialState = {
  path: '/login',
}

const mainSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state) => state.path = '/login',
    chat: (state) => state.path = '/',
    error: (state) => state.path = '404',
  },
});

const mainReducer = mainSlice.reducer;

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();