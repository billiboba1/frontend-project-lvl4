import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from './channelComponent';
import ChannelsComponent from './channelsComponent';
import { logIn, logOut } from "../../..";
import { useSelector, useDispatch } from "react-redux";

export const ChatComponent = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.main.token);
  const dispatch = useDispatch();
  console.log('localstorage:', localStorage.getItem('token'), "\nif:", !localStorage.getItem(token));
  React.useEffect(() => {
    if (!localStorage.getItem(token)) {
      console.log('toLogin');
      navigate('/login');
    }
  });
  return (
    <>
      <div className="d-flex flex-row justify-content-between px-3 py-2 footer">
        <p className="d-flex fs-4 align-items-center mb-0">Chat</p>
        <button type="button" className="btn btn-dark" onClick={() => {
          localStorage.removeItem(token);
          dispatch(logOut());
          navigate('/login');
        }}>Выйти</button>
      </div>
      <div className="mt-2 chat h-85 d-inline-flex w-100 justify-content-around rounded-3">
        <div className="w-30 bg-dark p-4 rounded-4 channels d-flex flex-column">
          <ChannelsComponent />
        </div>
        <div className="bg-dark p-4 rounded-4 channel d-flex flex-column w-50">
          <ChannelComponent />
        </div>
      </div>
    </>
  );
}