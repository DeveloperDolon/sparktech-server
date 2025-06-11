import { Request } from 'express';
import { ChatRoom } from './chatroom.model';

const createChatRoomIntoDB = async (req: Request) => {
  const { userId } = req.body;
  const authId = (req?.user as { userId: string })?.userId;

  const isExistChatRoom = await ChatRoom.findOne({
    users: { $all: [userId, authId] },
    isGroup: false,
  })
    .populate({
      path: 'users',
      model: 'User',
      localField: 'users',
      foreignField: 'id',
      justOne: false,
    })
    .populate({
      path: 'messages',
      model: 'Message',
      localField: 'messages',
      foreignField: 'id',
      justOne: false,
    });

  if (isExistChatRoom?.id) {
    return isExistChatRoom;
  }
  const newChatRoom = await ChatRoom.create({
    users: [authId, userId],
  });

  return newChatRoom;
};

export const ChatRoomService = { createChatRoomIntoDB };
