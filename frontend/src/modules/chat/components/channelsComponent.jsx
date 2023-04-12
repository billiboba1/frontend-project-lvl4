import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { addChannel, chooseChannel } from "../api/chatSlice";
import { SocketContext } from "./chat";

const ChannelsComponent = () => {
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  console.log(socket);
  return (
    <>
      <div className="channels-background h-100 d-flex flex-column justify-content-center">
        <div className="mb-2 w-100 align-middle d-flex flex-column">
          <div>Добавить канал</div>
          <form action="submit" onSubmit={(e) => {
            const input = e.target.querySelector('input');
            e.preventDefault();
            socket.emit('newChannel', {id: chatState.channels.length + 1, name: input.value});
            input.value = '';
          }}
            className="w-100 flex flex-column">
            <input className="w-100 form-control" type="text" placeholder="Введите канал" />
            <button type="submit" className="w-100 btn align-middle btn-success">Добавить</button>
          </form>
        </div>
        <div className="w-100 overflow-auto mb-auto">
          {Object.keys(chatState.channels).map((channel, i) => <button onClick={
            () => dispatch(chooseChannel(channel))
          } key={i + 1} className="w-100 btn btn-light text-dark my-1"># {channel}</button>)}
        </div>
      </div>
    </>
  );
}

export default ChannelsComponent;