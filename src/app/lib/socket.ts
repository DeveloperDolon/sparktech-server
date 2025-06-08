import { createServer } from 'http';
import app from '../../app';
import { Server } from 'socket.io';
import { messageFunction } from '../modules/Message/message.controller';
import { User } from '../modules/User/user.model';

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

export function getReceiverSocketId(userId: string) {
  return UserSocketMap[userId];
}

export const UserSocketMap: {
  [userId: string]: string;
} = {};

io.on('connection', async (socket) => {
  console.log('A user connected:', socket.id);

  const userId = socket.handshake.query.userId as string;

  if (userId) {
    UserSocketMap[userId] = socket.id;
  }

  messageFunction(socket);

  const userIds = Object.keys(UserSocketMap);
  const users = await User.find({ id: { $in: userIds }, status: 'online' });

  io.emit('getOnlineUsers', {users: users});

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    delete UserSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(UserSocketMap));
  });
});

export { io, httpServer };

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   socket.on('message', (data) => {
//     console.log(data);
//     // io.emit('message', "Valo acho?");
//   });

//   socket.emit('message', 'Welcome to the socket server!');

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });
