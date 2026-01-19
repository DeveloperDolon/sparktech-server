import { ChatRoom } from './../ChatRoom/chatroom.model';
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

      const chatRoom = await ChatRoom.findOne({ id: data?.roomId }).populate({
        path: 'users',
        model: 'User',
        localField: 'users',
        foreignField: 'id',
        match: { id: { $ne: data?.authId } },
        justOne: false,
      });

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

  socket.on(
    'messageSeen',
    async (data: { messageId: string; chatRoomId: string }) => {
      const message = await Message.findOne({ id: data?.messageId });

      await Message.updateOne(
        { id: data?.messageId },
        { isSeen: true, readBy: message?.receiverId },
      );

      if (message?.receiverId) {
        socket
          .to(getReceiverSocketId(message.receiverId))
          .emit('messageSeen', {
            message: message,
            chatRoomId: data?.chatRoomId,
          });
      }
    },
  );
};

export const MessageController = { messageFunction };
