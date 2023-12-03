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
      console.log('abcdeee');
      throw new CustomError(overlapEmail);
    }

    this.usersRepository.insert(params);
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
