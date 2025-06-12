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

export const ChatRoomRoutes = router;
