import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validation JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw Error('JWT token is missing');
  }

  // Bearer adsuhuhdasuhasd
  const [type, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw Error('Invalid JWT token');
  }
  next();
}