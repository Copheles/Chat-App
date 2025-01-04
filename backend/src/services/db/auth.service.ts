import User, { UserDocument } from '~/features/user/model/user.model';
import jwt from 'jsonwebtoken';
import { IAuthLogin, IAuthRegister } from '~/features/user/interface/auth.interface';
import { BadRequestException, NotFoundException } from '~/globals/middleware/errror.middleware';
import { config } from '~/globals/config/config';
import { Request, Response } from 'express';
import { userService } from './user.service';

class AuthService {
  public async addUser(requestBody: IAuthRegister) {
    const { email, password, name, avatar } = requestBody;

    if (await authService.isEmailAlreadyExists(email)) {
      throw new BadRequestException('Email is already in used');
    }

    if (await authService.isNameAlreadyExists(name)) {
      throw new BadRequestException('Name is already in used');
    }

    const newUser: UserDocument = await User.create({
      name,
      password,
      email,
      avatar
    });

    const payload = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    };

    const accessToken: string = this.generateJWT(payload);

    return accessToken;
  }

  public async login(requestBody: IAuthLogin) {
    const { email, password } = requestBody;

    if (!(await authService.isEmailAlreadyExists(email))) {
      throw new BadRequestException('Invalid crendentials');
    }

    const user = await userService.findUserByEmail(email);

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid crendentials');
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    const accessToken: string = this.generateJWT(payload);

    return accessToken;
  }

  public async logOut(res: Response) {
    res.cookie('accessToken', '', {
      httpOnly: true,
      expires: new Date(0)
    });
  }

  private async isEmailAlreadyExists(email: string): Promise<boolean> {
    const userByEmail: UserDocument | null = await User.findOne({ email });
    return userByEmail !== null;
  }

  private async isNameAlreadyExists(name: string): Promise<boolean> {
    const userByName: UserDocument | null = await User.findOne({ name });
    return userByName !== null;
  }

  private generateJWT(payload: any) {
    return jwt.sign(payload, config.JWT_TOKEN!, {
      expiresIn: '1d'
    });
  }
}

export const authService: AuthService = new AuthService();
