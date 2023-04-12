import { useSelector, useDispatch } from "react-redux"
import { useContext } from "react";
import { sendMessage } from "../api/chatSlice";
import { SocketContext } from "./chat";

const ChannelComponent = () => {
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const mainState = useSelector((state) => state.main);
  const socket = useContext(SocketContext);
  console.log(socket);
  const { currentChannel } = chatState;
  return (
    <>
      <div className="d-inline-flex justify-content-center border border-light border-bottom-0 rounded-top">
        # {currentChannel}
      </div>
      <div className="h-75 oveflow-auto">
        <div className="h-100 border border-light rounded-bottom border-top-0 overflow-auto">
          {chatState.channelsData[currentChannel].map((data, i) => {
            const user = Object.keys(data)[0];
            const message = data[user];
            return (
              <div className="ms-1 mb-2" key={i}>
                <b className="m-0 user row">{user}</b>
                <p className="m-0 ms-2 message row">{message}</p>
              </div>
            )
          })}
        </div>
      </div>
      <form className="mt-2 w-100" action="submit" onSubmit={(e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        if (input.value !== '') {
          socket.emit('newMessage', {id: chatState.channels[currentChannel], name: mainState.username, token: mainState.token, message: input.value});
          input.value = '';
        }
      }}>
        <input className="form-control" type="text" placeholder="Введите сообщение" />
        <button className="w-100 btn btn-success">Отправить</button>
      </form>
    </>
  );
}

export default ChannelComponent;
