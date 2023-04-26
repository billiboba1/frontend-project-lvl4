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
  notify: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    turnOffNotify: (state) => {
      state.notify = false;
    },
    turnOnNotify: (state) => {
      state.notify = true;
    },
    addChannel: (state, action) => {
      const { name, id } = action.payload;
      const channels = state.channels.map((object) => {
        return Object.keys(object)[0];
      });
      if (!channels.includes(name)) {
        state.channels.push({ [name]: id });
        state.channelsData[name] = [];
        state.nextChannelId += 1;
        if ( state.notify ) {
          successNotify('Канал успешно добавлен');
        }
      } else {
        errorNotify('Канал уже существует');
      }
    },
    removeChannel: (state, action) => {
      state.channels.map((channel) => {
        if (Object.values(channel)[0] === action.payload.id) {
          const choosenChannel = Object.keys(channel)[0];
          state.channels = state.channels.filter(obj => obj !== channel);
          delete state.channelsData[channel];
          if (choosenChannel === state.currentChannel) {
            state.currentChannel = 'general';
          }
        }
      });
    },
    sendMessage: (state, action) => {
      try {
        state.channelsData[state.currentChannel].push(action.payload);
      } catch (e) {
        console.log(e);
      }
    },
    chooseChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  }
});

export const { addChannel, removeChannel, sendMessage, chooseChannel, turnOffNotify, turnOnNotify } = chatSlice.actions;
export default chatSlice.reducer;
