import { useSelector, useDispatch } from "react-redux";
import { addChannel} from "../api/chatSlice";

const ChannelsComponent = () => {
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  return (
    <>
      <div className="channels-background d-flex flex-column">
        <div className="m-1 align-middle d-flex flex-column ">
          <div>Добавить канал</div>
          <form action="submit" onSubmit={(e) => {
              e.preventDefault();
              dispatch(addChannel(e.target.querySelector('input').value))
              console.log(e.target.querySelector('input').value);
            }}
            className="flex flex-column">
            <input type="text" placeholder="Введите канал"/>
            <button type="submit" className="btn row align-middle btn-success">+</button>
          </form>
        </div>
        {chatState.channels.map((channel) => <button key={channel} className="btn btn-light text-dark m-1">{channel}</button>)}
      </div>
    </>
  );
}

export default ChannelsComponent;