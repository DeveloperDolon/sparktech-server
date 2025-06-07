import { Request } from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import config from '../config';

const JWTStrategy = passportJWT.Strategy;
const secret = config.jwt_secret || 'secret';

const tokenExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.headers && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
    } else {
      jwt = authHeader;
    }
  }

  if (!jwt && req && req.cookies && req.cookies['accessToken']) {
    jwt = req.cookies['accessToken'];
  }

  return jwt;
};

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: tokenExtractor,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const { expiration } = jwtPayload;
      if (Date.now() > expiration) {
        done('Unauthorized.', false);
      }
      done(null, jwtPayload);
    },
  ),
);

export {};
