import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

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
      console.log(action);
      const { id, name } = action.payload;
      console.log(id, name);
      try {
        if (!state.channels.hasOwnProperty(name)) {
          state.channels[name] = id;
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
      //payload-obj
      try {
        //socket.emit('newMessage', {});
        state.channelsData[state.currentChannel].push(action.payload);
      } catch (e) {
        console.log('sending:', e);
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
