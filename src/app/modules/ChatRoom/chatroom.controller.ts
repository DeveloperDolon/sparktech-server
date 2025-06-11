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

export const ChatRoomController = { createChatRoom };
