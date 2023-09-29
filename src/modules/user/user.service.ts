import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterUserDto } from '../auth';
import { CreateUserDto } from './dto/create.dto';
import { UserRepository } from './user.repository';
import { FilterService } from '../filter/filter.service';
import { QueryFilterDto } from '../filter';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly filterService: FilterService,
  ) {}
  /**
   *
   */
  async getUsers(queryFilterDto: QueryFilterDto) {
    return await this.filterService.get<User>(
      queryFilterDto,
      this.userRepository,
      {
        paginate: {
          limit: 2,
        },
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
