import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from './channelComponent';
import ChannelsComponent from './channelsComponent';
import { logIn, logOut } from "../../..";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

export const ChatComponent = async () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.main.token);
  console.log(token);
  const username = useSelector((state) => state.main.username);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!localStorage.getItem(token)) {
      console.log('toLogin');
      navigate('/login');
    }
  });
  const data = await axios.get('/api/v1/data', { Authorization: token });
  const data2 = await axios.get('/api/v1/data', { headers: token });
  const data3 = await axios.get('/api/v1/data', { headers: { Authorization: token } });
  console.log(data);
  console.log(data2);
  console.log(data3);
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