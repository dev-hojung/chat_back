import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

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
}
