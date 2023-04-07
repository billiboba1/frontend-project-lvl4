import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
//import WebSocket from 'websocket';

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
        //socket.newChannel(action.payload);
      } catch (e) {
        console.log('newChannel', e);
      }
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
      try {
        //socket.newMessage(action.payload);
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
