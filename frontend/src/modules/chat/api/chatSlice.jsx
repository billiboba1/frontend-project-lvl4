import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import init from './socket';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io();
init(socket);

const initialState = {
  channels: ['general', 'random'],
  channelsData: {
    'general': [],
    'random': [],
  },
  currentChannel: 'general',
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      try {
        if (!state.channels.includes(action.payload)) {
          socket.emit("newChannel", action.payload);
          state.channels.push(action.payload);
          state.channelsData[action.payload] = [];
        }
      } catch (e) {
        console.log('newChannel', e);
      }
    },
    removeChannel: (state, action) => {
      state = state.channels.filter((channel) => (channel !== action.payload));
      delete state.channelsData[action.payload];
    },
    sendMessage: (state, action) => {
      //payload-obj
      try {
        socket.emit('newMessage', action.payload);
        state.channelsData[state.currentChannel].push(action.payload);
      } catch (e) {
        console.log('sending:', e);
      }
    },
    chooseChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  }
});

export const { addChannel, removeChannel, sendMessage, chooseChannel, showModal } = chatSlice.actions;
export default chatSlice.reducer;
