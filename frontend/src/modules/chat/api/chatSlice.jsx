import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: ['#general', '#random'],
  channelsData: {
    '#general': [],
    '#random': [],
  },
  currentChannel: '',
}
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChannel(state, payload) {
      state.channels.push(payload);
      state.channelsData.payload = [];
    },
    removeChannel(state, payload) {
      state = state.channels.filter((channel) => (channel !== payload));
      delete state.channelsData[payload];
    },
    sendMessage(state, payload) {
      //payload-obj
      state.channelsData[state.currentChannel].push(payload);
    },
    chooseChannel(state, payload) {
      state.currentChannel = payload;
    },
  }
});

export const {addChannel, removeChannel, sendMessage, chooseChannel} = chatSlice.actions;
export default chatSlice.reducer;
