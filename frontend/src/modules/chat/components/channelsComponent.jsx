import { useSelector } from "react-redux"

const ChannelsComponent = () => {
  const chatState = useSelector((state) => state.chat);
  console.log(chatState);
  return (
    <div>
      {chatState.channels.map((channel) => <button className="btn btn-secondary">{channel}</button>)}
    </div>
  )
}

export default ChannelsComponent;