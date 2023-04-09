export default async (socket) => {
  // Работа с сокетами вне реакта, это уровень инициализации приложения
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
    console.log('newMessage:', action.payload);
  });
  socket.on('newChannel', (action) => {
    console.log('newChannel:', action);
  });
  socket.on('removeChannel', (action) => {
    console.log('removeChannel:', action);
  });
  socket.on('renameChannel', (action) => {
    console.log('renameChannel:', action);
  });

  const withAcknowledgement = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    let state = 'pending'; // eslint-disable-line
    const timer = setTimeout(() => {
      state = 'rejected';
      reject();
    }, 3000);
  
    socketFunc(...args, (response) => {
      if (state !== 'pending') return;
  
      clearTimeout(timer);
  
      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }
  
      reject();
    });
  });
  
  const api = {
    sendMessage: withAcknowledgement((...args) => socket.volatile.emit('newMessage', ...args)),
    createChannel: withAcknowledgement((...args) => socket.volatile.emit('newChannel', ...args)),
    renameChannel: withAcknowledgement((...args) => socket.volatile.emit('renameChannel', ...args)),
    removeChannel: withAcknowledgement((...args) => socket.volatile.emit('removeChannel', ...args)),
  };

};