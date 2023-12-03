import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

// 유저 생성 DTO
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

// 로그인 DTO
export class UserLoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
