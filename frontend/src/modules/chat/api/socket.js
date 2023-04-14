import { useDispatch } from "react-redux";
import { addChannel, sendMessage, removeChannel } from "./chatSlice";

export default (socket) => {
  const dispatch = useDispatch();

  socket.on('open', (action) => {
    console.log('opened');
  });
  socket.on('message', (action) => {
    console.log('message');
  });
  socket.on('close', (action) => {
    console.log('closed');
  });
  socket.on('newMessage', (action) => {
    console.log('newMessage:', action);
    //dispatch(sendMessage(action.payload));
  });
  socket.on('sendMessage', (action) => {
    console.log('myMessage:', action);
  })
  socket.on('newChannel', (action) => {
    console.log('newChannel:', action);
    dispatch(addChannel(action.payload));
  });
  socket.on('removeChannel', (action) => {
    console.log('removeChannel:', action);
    dispatch(removeChannel(action.payload));
  });
  socket.on('renameChannel', (action) => {
    console.log('renameChannel:', action);
  });
};