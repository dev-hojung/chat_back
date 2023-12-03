import { Body, Controller, Post } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
@ApiTags('user')
@ApiSecurity('access-token')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  async createUser(@Body() param: CreateUserDto) {
    await this.usersService.createUser(param);
  }
}
