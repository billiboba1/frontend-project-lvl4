import { useSelector, useDispatch } from "react-redux"
import { sendMessage } from "../api/chatSlice";

const ChannelComponent = () => {
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { currentChannel } = chatState;
  console.log(chatState, chatState.channelsData, currentChannel);
  return (
    <div>
      <div className="h-100 row border border-light border-around">
      {chatState.channelsData[currentChannel].map(([user, message]) => {
        <div key={user}>
          <p className="user row">{user}</p>
          <p className="message row">{message}</p>
        </div>
      })}
      </div>
      <form className="row" action="submit">
        <input type="text" placeholder="Введите сообщение" />
        <button className="btn btn-success" onSubmit={(event) => {
          if (event.target.value !== '') {
            dispatch(sendMessage({ user: event.target.value }))
          }
        }}>Отправить</button>
      </form>
    </div>
  );
}

export default ChannelComponent;
