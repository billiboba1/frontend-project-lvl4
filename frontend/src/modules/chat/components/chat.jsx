import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from './channelComponent';
import ChannelsComponent from './channelsComponent';

export const ChatComponent = () => {
  const navigate = useNavigate();
  console.log(localStorage.token, !localStorage.token);
  if (!localStorage.token) {
    //React.useEffect(() => navigate('/login'));
  }
  return (
    <>
      <div className="d-flex flex-row justify-content-between px-3 py-2 footer">
        <p className="d-flex fs-4 align-items-center mb-0">Chat</p>
        <button type="button" className="btn btn-dark" onClick={() => navigate('/login')}>Выйти</button>
      </div>
      <div className="chat h-75 mx-3 d-inline-flex align-items-stretch w-100 justify-content-around rounded-3">
        <div className="bg-dark p-4 rounded-4 channels d-flex flex-column">
          <ChannelsComponent />
        </div>
        <div className="bg-dark p-4 rounded-4 channel d-flex flex-column w-50">
          <ChannelComponent />
        </div>
      </div>
    </>
  );
}