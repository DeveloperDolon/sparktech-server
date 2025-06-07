import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { jwtHelpers } from '../helpers/jwtHelpers';
import config from '../config';
import { Secret } from 'jsonwebtoken';

const auth = () => {
  return async (
    req: Request & { user?: unknown },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Authentication token is missing',
        );
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt_secret as Secret,
      );

      req.user = verifiedUser;

      next();
    } catch (error) {
      next(error);
    }
  };
};
