import { Request } from 'express';
import { ChatRoom } from './chatroom.model';
import { Message } from '../Message/message.model';

const createChatRoomIntoDB = async (req: Request) => {
  const { userId } = req.body;
  const authId = (req?.user as { userId: string })?.userId;

  const isExistChatRoom: any = await ChatRoom.findOne({
    users: { $all: [userId, authId] },
    isGroup: false,
  }).populate({
    path: 'users',
    model: 'User',
    localField: 'users',
    foreignField: 'id',
    match: { id: { $ne: authId } },
    justOne: false,
  });

  if (isExistChatRoom?.id) {
    const messages = await Message.find({ chatRoom: isExistChatRoom?.id });
    const chatRoomObj = isExistChatRoom.toObject();
    chatRoomObj.messages = messages;

    return chatRoomObj;
  }

  const newChatRoom = await ChatRoom.create({
    users: [authId, userId],
  });

  return newChatRoom;
};

export const ChatRoomService = { createChatRoomIntoDB };
