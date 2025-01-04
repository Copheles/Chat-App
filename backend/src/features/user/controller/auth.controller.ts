import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '~/globals/constants/http';
import { sendTokenCookie } from '~/globals/helpers/cookie';
import { authService } from '~/services/db/auth.service';

export class AuthController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = await authService.addUser(req.body);

    sendTokenCookie(res, accessToken);

    res.status(HTTP_STATUS.CREATED).json({
      message: 'User registered sucessfully'
    });
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = await authService.login(req.body);

    sendTokenCookie(res, accessToken);

    res.status(HTTP_STATUS.OK).json({
      message: 'User login successfully'
    });
  }

  public async logOut(req: Request, res: Response, next: NextFunction) {
    await authService.logOut(res);

    res.status(HTTP_STATUS.OK).json({
      message: 'Logged out successfully'
    });
  }
}

export const authController: AuthController = new AuthController();
