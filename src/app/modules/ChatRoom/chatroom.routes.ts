import express from 'express';
import { ChatRoomController } from './chatroom.controller';
import passport from 'passport';

const router = express.Router();

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  ChatRoomController.createChatRoom,
);

router.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  ChatRoomController.chatRoomList,
);

router.get(
  '/:chatRoomId',
  passport.authenticate('jwt', { session: false }),
  ChatRoomController.singleChatRoom,
);

export const ChatRoomRoutes = router;
