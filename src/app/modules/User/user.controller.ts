import httpStatus from 'http-status';
import catchAsync from '../../utiils/catchAsync';
import sendRespnse from '../../utiils/sendResponse';
import config from '../../config';
import { UserService } from './user.service';
import { UserSocketMap } from '../../lib/socket';

const register = catchAsync(async (req, res) => {
  const user = {
    name: req.body?.user?.name,
    email: req.body?.user?.email,
    password: req.body?.password,
    lastActive: new Date(),
  };

  const result = await UserService.createUserIntoDB(user);

  return sendRespnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successful',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await UserService.loginUser(req.body);

  const cookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite:
      process.env.NODE_ENV === 'production'
        ? 'none'
        : ('lax' as 'none' | 'lax'),
  };

  res.cookie('accessToken', result?.accessToken, {
    ...cookieOptions,
    maxAge: parseInt(config.jwt_access_token_expires_time || '3600') * 1000,
  });

  res.cookie('refreshToken', result?.refreshToken, {
    ...cookieOptions,
    maxAge: parseInt(config.jwt_refresh_token_expires_time || '6300') * 1000,
  });

  return sendRespnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful!',
    data: result,
  });
});

const me = catchAsync(async (req, res) => {
  const userId = (req?.user as { userId: string })?.userId;

  const result = await UserService.fetchUserData(userId);

  return sendRespnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Me data fetched successful!',
    data: result,
  });
});

const offline = catchAsync(async (req, res) => {
  const userId = (req?.user as { userId: string })?.userId;

  const result = await UserService.makeOfflineUser(userId);

  return sendRespnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is offline now!',
    data: result,
  });
});

const onlineUsers = catchAsync(async (req, res) => {
  const authId = (req?.user as { userId: string })?.userId;
  
  const userIds = Object.keys(UserSocketMap)?.filter((id) => id !== authId);

  const result = await UserService.getOnlineUsers(userIds);

  return sendRespnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Online users fetched successfully!',
    data: result,
  });
});

export const UserController = { register, login, me, offline, onlineUsers };
