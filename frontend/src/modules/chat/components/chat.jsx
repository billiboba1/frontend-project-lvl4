import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from './channelComponent';
import ChannelsComponent from './channelsComponent';

export const chatComponent = () => {
  return (
    <div className="chat h-100 d-inline-flex align-items-stretch w-100 justify-content-around bg-dark rounded-3">
      <div className="channels d-flex flex-column">
        <ChannelsComponent />
      </div>
      <div className="channel d-flex flex-column w-50 my-2">
        <ChannelComponent />
      </div>
    </div>
  );
}