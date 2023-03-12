import { useSelector } from "react-redux"

const ChannelsComponent = () => {
  const chatState = useSelector((state) => state.chat);
  console.log(chatState, chatState.channels);
  return (
    <div>
      {chatState.channels.map((channel) => <button key={channel} className="btn btn-secondary">{channel}</button>)}
    </div>
  );
}

export default ChannelsComponent;