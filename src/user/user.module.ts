import { Module } from '@nestjs/common';
import { DatabaseModule } from 'db/database.mobule';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [],
})
export class UserModule {}
