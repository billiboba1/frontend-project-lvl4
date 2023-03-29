import { createSlice } from '@reduxjs/toolkit';

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
      if (!state.channels.includes(action.payload)) {
        console.log('addChannel');
        console.log(action);
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
    chooseChannel:(state, action) => {
      state.currentChannel = action.payload;
    },
  }
});

export const {addChannel, removeChannel, sendMessage, chooseChannel, showModal} = chatSlice.actions;
export default chatSlice.reducer;
