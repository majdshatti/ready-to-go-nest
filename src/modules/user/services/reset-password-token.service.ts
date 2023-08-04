import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entites/user.entity';
import { RegisterUserDto } from '../../auth';
import { CreateUserDto } from '../dto/create.dto';
import { UserRepository } from './../repositories/user.repository';
import { ResetPasswordTokenRepository } from '../repositories/reset-password-token-repository';
import { ResetPasswordToken } from '../entites/reset-password-token.entity';

@Injectable()
export class ResetPasswordTokenService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly resetPasswordTokenRespository: ResetPasswordTokenRepository,
  ) {}

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

  /**
   *
   */
  async createResetPasswordToken(user: User): Promise<ResetPasswordToken> {
    return this.resetPasswordTokenRespository.save(user);
  }
}
