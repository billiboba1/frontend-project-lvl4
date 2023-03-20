import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from './channelComponent';
import ChannelsComponent from './channelsComponent';

export const chatComponent = () => {
  return (
    <div className="chat h-75 d-inline-flex align-items-stretch container-xl justify-content-around m-3 bg-dark rounded-3">
      <div className="channels d-flex flex-column">
        <ChannelsComponent />
      </div>
      <div className="channel d-flex flex-column">
        <ChannelComponent />
      </div>
    </div>
  );
}