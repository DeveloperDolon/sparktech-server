import { MessageController } from './../modules/Message/message.controller';
import { createServer } from 'http';
import app from '../../app';
import { Server } from 'socket.io';
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

    await User.updateOne(
      { id: userId },
      { status: 'online', lastActive: new Date() },
    );
  }

  MessageController.messageFunction(socket);

  Object.keys(UserSocketMap)?.forEach(async (userDataId) => {
    const userIds = Object.keys(UserSocketMap)?.filter(
      (id) => id !== userDataId,
    );
    const users = await User.find({ id: { $in: userIds }, status: 'online' });
    io.in(UserSocketMap[userDataId]).emit('getOnlineUsers', { users: users });
  });

  socket.on('disconnect', async () => {
    console.log('A user disconnected:', socket.id);

    if (userId && UserSocketMap[userId]) {
      await User.updateOne(
        { id: userId },
        { status: 'offline', lastActive: new Date() },
      );
    }
    delete UserSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(UserSocketMap));
  });
});

export { io, httpServer };
