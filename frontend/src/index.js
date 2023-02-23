import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import loginPage from './pages/loginPage';
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
    login: state.path = '/login',
    chat: state.path = '/',
    error: state.path = '404',
  },
});

const store = configureStore({
  reducer: {
    // counter – имя внутри объекта состояния state.counter
    counter: counterReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();