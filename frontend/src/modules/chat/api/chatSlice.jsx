import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: ['#general', '#random'],
  channelsData: {
    '#general': [],
    '#random': [],
  },
  currentChannel: '#general',
  //modalWindow: 'hidden',
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalWindow = 'show';
    },
    addChannel: (state, payload) => {
      state.channels.push(payload);
      state.channelsData[payload] = [];
      state.modalWindow = 'hide';
    },
    removeChannel: (state, payload) => {
      state = state.channels.filter((channel) => (channel !== payload));
      delete state.channelsData[payload];
    },
    sendMessage: (state, payload) => {
      //payload-obj
      state.channelsData[state.currentChannel].push(payload);
    },
    chooseChannel:(state, payload) => {
      state.currentChannel = payload;
    },
  }
});

export const {addChannel, removeChannel, sendMessage, chooseChannel, showModal} = chatSlice.actions;
export default chatSlice.reducer;
