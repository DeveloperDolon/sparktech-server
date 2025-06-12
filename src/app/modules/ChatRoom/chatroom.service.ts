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

const getChatRoomList = async (authId: string) => {
  const chatroomList = await ChatRoom.aggregate([
    {
      $match: {
        users: { $in: [authId.trim()] },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'users',
        foreignField: 'id',
        as: 'usersData',
      },
    },
    {
      $lookup: {
        from: 'messages',
        let: { chatRoom: '$id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$chatRoom', '$$chatRoom'] },
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
        as: 'latestMessage',
      },
    },
  ]);

  return chatroomList;
};

export const ChatRoomService = { createChatRoomIntoDB, getChatRoomList };
