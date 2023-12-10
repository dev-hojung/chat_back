import { Module } from '@nestjs/common';
import { DatabaseModule } from 'db/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [],
})
export class UserModule {}
