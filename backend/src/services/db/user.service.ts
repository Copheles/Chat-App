import { Request } from 'express';
import User, { UserDocument } from '~/features/user/model/user.model';
import { getPaginatedResults, PaginatedResults } from '~/globals/helpers/paginatedResults';
import { NotFoundException } from '~/globals/middleware/errror.middleware';

class UserService {
  public async getAllUsers(req: Request): Promise<PaginatedResults<UserDocument>> {
    const users = await getPaginatedResults(User, req, {
      searchFields: ['name']
    });

    return users;
  }

  private async getUserById(id: string): Promise<UserDocument> {
    const user: UserDocument | null = await User.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }

    return user;
  }

  public async getUserByName(name: string): Promise<UserDocument> {
    const user: UserDocument | null = await User.findOne({ name });

    if (!user) {
      throw new NotFoundException(`User with name: ${name} not found!`);
    }

    return user;
  }

  public async findUserByEmail(email: string): Promise<UserDocument> {
    const user: UserDocument | null = await User.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User with ${email} is not found!`);
    }

    return user;
  }
}

export const userService: UserService = new UserService();
