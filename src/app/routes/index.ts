import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { ChatRoomRoutes } from '../modules/ChatRoom/chatroom.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    router: UserRoutes,
  },
  {
    path: '/chatroom',
    router: ChatRoomRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
