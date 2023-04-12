import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from './channelComponent';
import ChannelsComponent from './channelsComponent';
import { logIn, logOut } from "../../..";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import init from '../api/socket';
import { io } from 'socket.io-client';
import { addChannel, sendMessage, removeChannel, setState} from "../api/chatSlice";


const socket = io();

export const SocketContext = React.createContext(socket);

export const ChatComponent = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.main.token);
  console.log(token, !localStorage.getItem(token));
  const username = useSelector((state) => state.main.username);
  const dispatch = useDispatch();
  socket.on('newMessage', (action) => {
    console.log('newMessage:', action.payload);
    dispatch(sendMessage(action.payload));
  });
  socket.on('newChannel', (action) => {
    console.log('newChannel:', action);
    dispatch(addChannel(action));
  });
  socket.on('removeChannel', (action) => {
    console.log('removeChannel:', action);
    dispatch(removeChannel(action.payload));
  });
  socket.on('renameChannel', (action) => {
    console.log('renameChannel:', action);
  });
  React.useEffect(async () => {
    if (!localStorage.getItem(token)) {
      console.log('toLogin');
      navigate('/login');
    } else {
      try {
        axios.get('/api/v1/data', { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) => res.data)
        .then((data) => dispatch(setState(data)));
      } catch (e) {
        console.log(e);
      }
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
          <ChannelsComponent/>
        </div>
        <div className="bg-dark p-4 rounded-4 channel d-flex flex-column w-50">
          <ChannelComponent/>
        </div>
      </div>
    </>
  );
}