import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth';
import { CreateUserDto } from './dto/create.dto';
import { isValidEmail } from 'src/utils';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Create user by register dto
   *
   * @param registerUserDto Register data transfer object
   * @returns Promise<User>
   */
  async createUser(dto: RegisterUserDto | CreateUserDto): Promise<User> {
    const user = new User();

    // Salt value
    const salt = await bcrypt.genSalt(10);

    user.username = dto.username;
    user.email = dto.email;
    user.loginStrategy = 'jwt';
    user.type = 'end-user';

    // Hash password with the salt value
    user.password = await bcrypt.hash(dto.password, salt);

    return await user.save();
  }

  /**
   * Get a user by username
   *
   * @param username string
   * @returns Promise<User>
   */
  async findByIdentifier(identifier: string): Promise<User> {
    if (isValidEmail(identifier))
      return await this.findOneBy({ email: identifier });
    else return await this.findOneBy({ username: identifier });
  }
}
