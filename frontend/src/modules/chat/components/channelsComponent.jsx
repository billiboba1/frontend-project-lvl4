import { useSelector, useDispatch } from "react-redux";
import React, { useContext, useState } from "react";
import { addChannel, chooseChannel, removeChannel } from "../api/chatSlice";
import { SocketContext } from "./chat";
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ChannelsComponent = () => {
  //const [show, setShow] = useState(false);
  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  const [open, setOpen] = useState({
    collapse: {},
    modal: false,
  });
  console.log(open);
  const handleShow = () => {
    setOpen({ collapse: open.collapse, modal: true });
  }
  const handleClose = () => {
    setOpen({ collapse: open.collapse, modal: false });
  };
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const focus = (channel) => {
    if (channel === chatState.currentChannel) {
      return 'w-100 btn my-1 p-0 text-light btn-dark';
    }
    return 'w-100 btn btn-light text-dark my-1 p-0';
  }
  const focusExtra = (channel) => {
    if (channel === chatState.currentChannel) {
      return "w-75 border-0 rounded-start rounded-4 bg-dark text-light p-0";
    }
    return 'w-75 border-0 rounded-start rounded-4 text-dark p-0';
  }
  return (
    <>
      <div className="channels-background h-100 d-flex flex-column justify-content-center">
        <div className="mb-2 w-100 align-middle d-flex flex-column">
          <Button variant="success" onClick={handleShow}>
            Добавить канал
          </Button>

          <Modal show={open.modal} onHide={handleClose}>
            <Modal.Body>
              <form action="submit" onSubmit={(e) => {
                const input = e.target.querySelector('input');
                e.preventDefault();
                socket.emit('newChannel', { name: input.value });
                input.value = '';
                handleClose();
              }}
                className="w-100 flex flex-column">
                <input className="w-100 form-control" type="text" placeholder="Введите канал" />
                <button type="submit" className="w-100 btn align-middle btn-success">Добавить</button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
        <div className="w-100 overflow-auto mb-auto">
          {chatState.channels.map((channel, i) => {
            if (['general', 'random'].includes(channel)) {
              return (
                <button onClick={
                  () => {
                    dispatch(chooseChannel(channel));
                  }
                } key={i} className={focus(channel)}># {channel}</button>)
            } else {
              console.log(open.collapse[channel], open.collapse[channel] !== false);
              if (!open.collapse.hasOwnProperty([channel])) {
                setOpen({ collapse: Object.assign(open.collapse, { [channel]: false }), modal: open.modal });
              }
              return (
                <div className={focus(channel)}>
                  <button onClick={
                    () => dispatch(chooseChannel(channel))
                  } className={focusExtra(channel)}>
                    # {channel}
                  </button>
                  <button className="w-25 border-0 rounded-end rounded-4 btn-dark p-0" onClick={() => {
                    console.log('before: ', open.collapse);
                    setOpen({ collapse: Object.assign(open.collapse, { [channel]: !open.collapse[channel] }), modal: open.modal });
                    console.log('after: ', open.collapse);
                  }} aria-controls={`collapse-${channel}`} aria-expanded={open.collapse[channel]}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                  </button>
                  <Collapse in={open.collapse[channel]}>
                    <button type="button" className="btn btn-outline-danger p-0" id={`collapse-${channel}`} onClick={() => socket.emit("removeChannel", { id: chatState.channels.indexOf(channel) + 1 + chatState.deletedChannels })}>
                      Удалить канал
                    </button>
                  </Collapse>
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  );
}

export default ChannelsComponent;