import catchAsync from '../../utiils/catchAsync';
import sendResponse from '../../utiils/sendResponse';
import { ChatRoomService } from './chatroom.service';

const createChatRoom = catchAsync(async (req, res) => {
  const result = await ChatRoomService.createChatRoomIntoDB(req);

  return sendResponse(res, {
    statusCode: 200,
    message: 'Chat room created successful!',
    success: true,
    data: result,
  });
});

const chatRoomList = catchAsync(async (req, res) => {
  const authId = (req?.user as { userId: string })?.userId;
  const result = await ChatRoomService.getChatRoomList(authId);

  return sendResponse(res, {
    statusCode: 200,
    message: 'Chat room list retrieved successful!',
    success: true,
    data: result,
  });
});

const singleChatRoom = catchAsync(async (req, res) => {
  const { chatRoomId } = req.params;
  const result = await ChatRoomService.getSingleChatRoom(chatRoomId);

  return sendResponse(res, {
    statusCode: 200,
    message: 'Single chat room retrieved successful!',
    success: true,
    data: result,
  });
});

export const ChatRoomController = {
  createChatRoom,
  chatRoomList,
  singleChatRoom,
};
