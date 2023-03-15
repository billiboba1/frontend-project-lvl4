import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from './channelComponent';
import ChannelsComponent from './channelsComponent';

export const chatComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="chat d-inline-flex justify-content-center m-3 container-xl bg-dark rounded-3">
      <div className="channels d-flex flex-column">
        <ChannelsComponent />
      </div>
      <div className="channel d-flex flex-column">
        <ChannelComponent />
      </div>
    </div>
  );
}