import { useSelector, useDispatch } from "react-redux";
import { addChannel, showModal } from "../api/chatSlice";
import cn from 'classnames';

const ChannelsComponent = () => {
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const modalClasses = cn('modal', 'fade', chatState.modalWindow);
  const Input = (<input className="inputChannel" type='text' placeholder='Введите канал' />)
  return (
    <>
      <div className={modalClasses} id="modalCenter" tabindex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
              <h5 className="modal-title" id="modalTitle">Добавить канал</h5>
            </div>
            <div className="modal-body">
              <form action="submit">
                <input className="inputChannel" type='text' placeholder='Введите канал' />
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onSubmit={(e) => dispatch(addChannel(chatState, e.target.value))}>Добавить</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
      <div className="channels-background d-flex flex-column">
        <div className="m-1 align-middle d-flex flex-row ">
          <div>Добавить канал</div>
          <button className="m-1" data-bs-target="#modalCenter" data-bs-toggle="modal" onClick={() => {
            dispatch(showModal());
            console.log(modalClasses);
            console.log(chatState);
          }}>+</button>
        </div>
        {chatState.channels.map((channel) => <button key={channel} className="btn btn-light text-dark m-1">{channel}</button>)}
      </div>
    </>
  );
}

export default ChannelsComponent;