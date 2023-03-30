import { useSelector, useDispatch } from "react-redux";
import { addChannel, chooseChannel } from "../api/chatSlice";

const ChannelsComponent = () => {
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  return (
    <>
      <div className="channels-background d-flex flex-column">
        <div className="m-1 mb-3 mt-0 w-100 align-middle d-flex flex-column">
          <div>Добавить канал</div>
          <form action="submit" onSubmit={(e) => {
              const input = e.target.querySelector('input');
              e.preventDefault();
              dispatch(addChannel(input.value))
              input.value = '';
            }}
            className="w-100 flex flex-column">
            <input className="w-100 form-control" type="text" placeholder="Введите канал"/>
            <button type="submit" className="w-100 btn align-middle btn-success">Добавить</button>
          </form>
        </div>
        {chatState.channels.map((channel) => <button onClick={
          () => dispatch(chooseChannel(channel))
        } key={channel} className="w-100 btn btn-light text-dark m-1"># {channel}</button>)}
      </div>
    </>
  );
}

export default ChannelsComponent;