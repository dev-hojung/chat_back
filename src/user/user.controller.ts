import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() param: CreateUserDto) {
    return await this.userService.createUser(param);
  }

  @Post('/login')
  async login(@Body() param: LoginUserDto) {
    return await this.userService.login(param);
  }
}
