import type { Socket } from 'socket.io';
import { Message } from './message.model';

export const messageFunction = (socket: Socket) => {
  socket.on(
    'message',
    async (data: {
      userId: string;
      message: string;
      authId: string;
      roomId: string;
    }) => {
      const newMessage = await Message.create({
        chatRoom: data?.roomId,
        content: data?.message,
        sender: data?.authId,
        receiverId: data?.userId,
      });

      socket.to(data.userId).emit('message', data?.message);
    },
  );
};

export const MessageController = {};
