import catchAsync from '../../utiils/catchAsync';
import sendResponse from '../../utiils/sendResponse';

import { UserService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successful!',
    data: result,
  });
});

export const UserController = { createUser };
