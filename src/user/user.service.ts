import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { CustomError } from 'customError/customError';
import { loginError, overlapEmail } from './user.error';
import { AuthService } from 'auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER')
    private usersRepository: Repository<User>,
    private authService: AuthService,
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

  async login(params: LoginUserDto) {
    const res = await this.validateUser(params);
    const access_token = this.authService.token({ email: res.email });

    return {
      access_token,
    };
  }

  async validateUser(params: LoginUserDto): Promise<Omit<User, 'password'>> {
    const { email } = params;
    const user = await this.findUser(email);

    if (!user) {
      throw new CustomError(loginError);
    }

    return {
      email: user.email,
      name: user.name,
      id: user.id,
    } as Omit<User, 'password'>;
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
