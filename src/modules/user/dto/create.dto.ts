import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { UniqueConstraint } from 'src/common/class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Validate(UniqueConstraint, [User, 'username'])
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(UniqueConstraint, [User, 'email'])
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;

  @IsIn(['jwt', 'google'])
  loginStrategy: string;
}
