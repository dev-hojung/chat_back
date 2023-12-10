import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

// 유저 생성 DTO
export class CreateUserDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '이름' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '패스워드' })
  @IsNotEmpty()
  password: string;
}

// 로그인 DTO
export class LoginUserDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '패스워드' })
  @IsNotEmpty()
  password: string;
}
