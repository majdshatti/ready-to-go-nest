import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterUserDto } from '../auth';
import { CreateUserDto } from './dto/create.dto';
import { UserRepository } from './user.repository';
import { FilterService } from '../filter/filter.service';
import { UserQueryFilterDto } from './dto/get-users-query.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly filterService: FilterService,
  ) {}
  /**
   *
   */
  async getUsers(userQueryFilterDto: UserQueryFilterDto) {
    return await this.filterService.get<User>(
      userQueryFilterDto,
      this.userRepository,
      {
        sortableColumns: ['passwordResets.reset_password_expire'],
        withRelations: ['passwordResets'],
      },
    );
  }

  /**
   *
   */
  async getOne(conditions) {
    return await this.userRepository.findOne(conditions);
  }

  /**
   *
   * @param identifier
   */
  async getUserByIdentifier(identifier: string): Promise<User> {
    return await this.userRepository.findByIdentifier(identifier);
  }

  /**
   *
   * @param dto
   * @returns
   */
  async createUser(dto: RegisterUserDto | CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(dto);
  }
}
