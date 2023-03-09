import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from '../../../components/channelComponent';
import ChannelsComponent from '../../../components/channelsComponent';
import { createSlice } from '@reduxjs/toolkit';

export const chatComponent = () => {
  const navigate = useNavigate();
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
        state.channelsData[state.currentChannel].push(payload);
      },
      chooseChannel(state, payload) {
        state.currentChannel = payload;
      },
    }
  });
  return (
    <div className="chat row">
      <div className="channels">
        <ChannelsComponent />
      </div>
      <div className="channel">
        <ChannelComponent />
      </div>
    </div>
  )
}