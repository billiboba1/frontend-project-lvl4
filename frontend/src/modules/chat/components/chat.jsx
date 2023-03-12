import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from './channelComponent';
import ChannelsComponent from './channelsComponent';

export const chatComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="chat row">
      <div className="channels">
        <ChannelsComponent />
      </div>
      <div className="channel">
        <ChannelComponent />
      </div>
    </div>
  );
}