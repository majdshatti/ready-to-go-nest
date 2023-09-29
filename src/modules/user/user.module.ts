import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { FilterModule } from '../filter/filter.module';

@Module({
  imports: [FilterModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
