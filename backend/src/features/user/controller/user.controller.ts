import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '~/globals/constants/http';
import { userService } from '~/services/db/user.service';

export class UserController {
  public async getMe(req: Request, res: Response, next: NextFunction) {
    res.status(HTTP_STATUS.OK).json(req.currentUser);
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const users = await userService.getAllUsers(req);

    res.status(HTTP_STATUS.OK).json({
      message: 'Get All Users',
      ...users
    });
  }
}

export const userController: UserController = new UserController();
