const onlineUsers = new Map();

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('user:online', (data) => {
      onlineUsers.set(socket.id, data);
      io.emit('workspace:users', Array.from(onlineUsers.values()));
    });

    socket.on('notification:send', (data) => {
      io.emit('notification:receive', { ...data, _id: Date.now().toString(), read: false, time: new Date().toISOString() });
    });

    socket.on('disconnect', () => {
      onlineUsers.delete(socket.id);
      io.emit('workspace:users', Array.from(onlineUsers.values()));
    });
  });
};
