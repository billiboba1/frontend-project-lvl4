import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  channels: [ 'general', 'random' ],
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
      console.log(action);
      const { name } = action.payload;
      try {
        if (!state.channels.includes(name)) {
          state.channels.push(name);
          state.channelsData[name] = [];
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
      console.log(action);
      try {
        state.channelsData[state.currentChannel].push(action.payload);
      } catch (e) {
        console.log('sending message:', e);
      }
    },
    chooseChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    setState: (state, action) => {
      console.log(action.payload);
    },
  }
});

export const { addChannel, removeChannel, sendMessage, chooseChannel, setState } = chatSlice.actions;
export default chatSlice.reducer;
