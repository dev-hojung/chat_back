import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { CustomError } from 'customError/customError';
import { overlapEmail } from './user.error';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER')
    private usersRepository: Repository<User>,
  ) {}

  async createUser(params: CreateUserDto) {
    const isUser = await this.findUser(params.email);

    if (isUser !== null) {
      throw new CustomError(overlapEmail);
    }

    await this.usersRepository.insert(params);
    return {
      success: true,
    };
  }

  async findUser(email: string) {
    return await this.usersRepository
      .findOne({
        where: {
          email,
        },
      })
      .then((res) => res);
  }
}
