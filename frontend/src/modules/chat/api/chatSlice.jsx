import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import init from './socket';
import { io } from 'socket.io-client';

const socket = io();
init(socket);

const initialState = {
  channels: { 'general': 1, 'random': 2},
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
        const value = action.payload;
        if (!state.channels.includes(value)) {
          const id = state.channels.length + 1;
          socket.emit("newChannel", {'id': id, 'name': value});
          state.channels[value] = id;
          state.channelsData[value] = [];
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
        socket.emit('newMessage', {});
        state.channelsData[state.currentChannel].push(action.payload);
      } catch (e) {
        console.log('sending:', e);
      }
    },
    chooseChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    /*setState: (state, action) => {
      state.
    }*/
  }
});

export const { addChannel, removeChannel, sendMessage, chooseChannel, showModal } = chatSlice.actions;
export default chatSlice.reducer;
