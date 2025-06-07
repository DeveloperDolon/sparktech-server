import type { Socket } from 'socket.io';

export const messageFunction = (socket: Socket) => {
  socket.on('message', (data) => {
    console.log('Message received:', data);
  });
};
