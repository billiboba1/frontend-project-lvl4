import { createSlice } from '@reduxjs/toolkit';
import { Server } from "socket.io";
import WebSocket from 'ws';
import axios from "axios";

const initialState = {
  channels: ['general', 'random'],
  channelsData: {
    'general': [],
    'random': [],
  },
  currentChannel: 'general',
}

const socket = new WebSocket('ws://localhost:5001');
socket.on('open', (e) => {
  try {
    const data = axios.get('api/v2/data', { Authorization: token }).then((res) => {
      return res.data;
    });
    console.log('data:', data);
  } catch (error) {
    //
    console.log(error);
  }
});
socket.on('close', (e) => {
  console.log('closed', e);
});
socket.on('message', (e) => {

});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      if (!state.channels.includes(action.payload)) {
        state.channels.push(action.payload);
        state.channelsData[action.payload] = [];
      }
    },
    removeChannel: (state, action) => {
      state = state.channels.filter((channel) => (channel !== action.payload));
      delete state.channelsData[action.payload];
    },
    sendMessage: (state, action) => {
      //payload-obj
      state.channelsData[state.currentChannel].push(action.payload);
    },
    chooseChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  }
});

export const { addChannel, removeChannel, sendMessage, chooseChannel, showModal } = chatSlice.actions;
export default chatSlice.reducer;
