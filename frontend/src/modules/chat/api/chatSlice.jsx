import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { errorNotify, successNotify } from "../api/notification";

const initialState = {
  channels: [{ 'general': 1 }, { 'random': 2 }],
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
      const { name, id } = action.payload;
      console.log(name, id);
      const channels = state.channels.map((object) => {
        return Object.keys(object)[0];
      });
      console.log(channels, name, !channels.includes(name));
      if (!channels.includes(name)) {
        console.log({ [name]: id });
        state.channels.push({ [name]: id });
        state.channelsData[name] = [];
        console.log(state.channelsData);
        state.nextChannelId += 1;
        successNotify('Канал успешно добавлен');
      } else {
        errorNotify('Канал уже существует');
      }
    },
    removeChannel: (state, action) => {
      console.log(action.payload);
      state.channels.map((channel) => {
        console.log(channel);
        console.log(Object.keys(channel)[0], Object.values(channel)[0], Object.values(channel)[0] === action.payload.id);
        if (Object.values(channel)[0] === action.payload.id) {
          const choosenChannel = Object.keys(channel)[0];
          state.channels = state.channels.filter(obj => obj !== channel);
          delete state.channelsData[channel];
          console.log(choosenChannel);
          if (choosenChannel === state.currentChannel) {
            state.currentChannel = 'general';
          }
        }
      });
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
  }
});

export const { addChannel, removeChannel, sendMessage, chooseChannel } = chatSlice.actions;
export default chatSlice.reducer;
