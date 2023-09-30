import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { FilterModule } from '../filter/filter.module';
import { UniqueConstraint } from 'src/common/class-validator';

@Module({
  imports: [FilterModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UniqueConstraint],
  exports: [UserService],
})
export class UserModule {}
