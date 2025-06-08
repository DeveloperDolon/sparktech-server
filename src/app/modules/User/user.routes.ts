import express, { Router } from 'express';
import validateRequest from '../../utiils/validateRequest';
import UserValidation from './user.validation';
import { UserController } from './user.controller';
import passport from 'passport';

const router: Router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.userCreateValidation),
  UserController.register,
);

router.post(
  '/login',
  validateRequest(UserValidation.userLoginValidation),
  UserController.login,
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  UserController.me,
);

router.post(
  '/offline',
  passport.authenticate('jwt', { session: false }),
  UserController.offline,
);

router.get(
  '/online-users',
  passport.authenticate('jwt', { session: false }),
  UserController.onlineUsers,
);

export const UserRoutes = router;
