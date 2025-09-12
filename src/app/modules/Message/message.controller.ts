import { ChatRoom } from './../ChatRoom/chatroom.model';
import type { Socket } from 'socket.io';
import { Message } from './message.model';
import { getReceiverSocketId } from '../../lib/socket';
import { get } from 'node:https';

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
      const chatRoom = await ChatRoom.findOne({id: data?.roomId});

      socket.to(getReceiverSocketId(data.userId)).emit('chatroom', {
        chatRoom,
        newMessage: data?.message,
      });

      socket.to(getReceiverSocketId(data.userId)).emit('message', {
        chatRoom: newMessage?.chatRoom,
        content: newMessage?.content,
        sender: newMessage?.sender,
        receiverId: newMessage?.receiverId,
      });
    },
  );
};

export const MessageController = { messageFunction };
