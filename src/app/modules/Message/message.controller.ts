import type { Socket } from 'socket.io';
import { Message } from './message.model';
import { getReceiverSocketId } from '../../lib/socket';

const messageFunction = (socket: Socket) => {
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

      socket
        .to(getReceiverSocketId(data.userId))
        .emit('message', {
          chatRoom: newMessage?.chatRoom,
          content: newMessage?.content,
          sender: newMessage?.sender,
          receiverId: newMessage?.receiverId
        });
    },
  );
};

export const MessageController = {messageFunction};
