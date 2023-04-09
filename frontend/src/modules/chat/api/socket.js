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
};