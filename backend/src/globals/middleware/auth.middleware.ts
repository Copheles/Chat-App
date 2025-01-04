import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ForbiddenException, UnAuthorizedException } from './errror.middleware';
import { config } from '../config/config';

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.accessToken) {
    throw new UnAuthorizedException('Token is invalid, please login again!.');
  }

  const token = req.cookies.accessToken;

  try {
    const userDecoded = jwt.verify(token, config.JWT_TOKEN!) as UserPayload;

    req.currentUser = userDecoded;
    next();
  } catch (error) {
    throw new UnAuthorizedException('Token is invalid, please login again!');
  }
}

export function checkUserAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) {
    throw new ForbiddenException('You are not logged in');
  }

  next();
}

export function checkPermission(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.currentUser.role)) {
      throw new ForbiddenException('You cannot perform this action.');
    }
    next();
  };
}
