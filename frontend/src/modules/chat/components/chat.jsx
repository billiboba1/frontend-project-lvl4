import React from "react";
import { useNavigate } from "react-router-dom";
import ChannelComponent from './channelComponent';
import ChannelsComponent from './channelsComponent';
import { logIn, logOut } from "../../..";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import init from '../api/socket';
import { io } from 'socket.io-client';
import { addChannel, sendMessage, removeChannel, chooseChannel } from "../api/chatSlice";


const socket = io();

export const SocketContext = React.createContext(socket);

export const ChatComponent = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.main.token);
  const username = useSelector((state) => state.main.username);
  const dispatch = useDispatch();
  socket.on('newMessage', (action) => {
    dispatch(sendMessage(action));
  });
  socket.on('newChannel', (action) => {
    dispatch(addChannel(action));
  });
  socket.on('removeChannel', (action) => {
    dispatch(removeChannel(action));
  });
  React.useEffect(async () => {
    if (!localStorage.getItem(token)) {
      console.log('toLogin');
      navigate('/login');
    } else {
      try {
        axios.get('/api/v1/data', { headers: { "Authorization": `Bearer ${token}` } })
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            data.channels.forEach((channelData) => {
              const { name } = channelData;
              console.log(channelData, name);
              if (!['general', 'random'].includes(name)) {
                dispatch(addChannel({ name }));
                console.log('added ', name);
              }
            });
            data.messages.forEach((messageData) => {
              const { channel, message, name } = messageData;
              dispatch(chooseChannel(channel));
              dispatch(sendMessage({ channel, message, name }));
            });
          });
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
          <ChannelsComponent />
        </div>
        <div className="bg-dark p-4 rounded-4 channel d-flex flex-column w-50">
          <ChannelComponent />
        </div>
      </div>
    </>
  );
}