import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { formatResponse } from 'src/utils';
import { UserQueryFilterDto } from './dto/get-users-query.dto';
import { FilterDecorator } from '../filter';

@Controller('user')
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @Get('/')
  async getUsers(@FilterDecorator() userQueryFilterDto: UserQueryFilterDto) {
    return formatResponse(
      HttpStatus.OK,
      'users retrieved successfully',
      await this.userService.getUsers(userQueryFilterDto),
    );
  }
}
