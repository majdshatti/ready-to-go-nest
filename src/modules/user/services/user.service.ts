import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../../auth';
import { CreateUserDto } from '../dto/create.dto';
import { UserRepository } from './../repositories/user.repository';
import { ResetPasswordTokenRepository } from '../repositories/reset-password-token-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   *
   * @param dto
   * @returns
   */
  async createUser(dto: RegisterUserDto | CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(dto);
  }

  /**
   *
   * @param identifier
   */
  async getUserByIdentifier(identifier: string): Promise<User> {
    return await this.userRepository.findByIdentifier(identifier);
  }
}
