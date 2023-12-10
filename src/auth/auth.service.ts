import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  token(email) {
    try {
      return this.jwtService.sign(email);
    } catch (err) {
      console.log(err);
    }
  }
  // TODO: 로그인이 한군데로 고정 하고싶다. ex) 로그인시에 디비에 데이터있을시 업뎃 해당유저의 아이디와 토큰을 db에 저장하고  api 미들웨어에서 해당 유저의 id와 토큰으로 2중 검사(토큰db userdb 같이 조회).
  // 로그아웃시 db에서 해당 토큰 제거xe
  // TODO: 비밀번호 오류 5번 계정비활성화 or 추가인증. 오류카운팅 ++

  // async login(user: LoginUserDto) {
  //   const payload = { email: user.email };

  //   return this.validateUser(user.email, user.password).then(async (res) => {
  //     if (res.status) {
  //       throw new CustomError(res);
  //     }

  //     return {
  //       access_token: this.jwtService.sign({ ...payload }),
  //       usertype: res.usertype,
  //       username: res.username,
  //       userId: res.id,
  //       expires: 86400000,
  //     };
  //   });
  // }

  async compareHash(
    password: string,
    hash: string | undefined,
  ): Promise<boolean> {
    return compare(password, hash);
  }
}
