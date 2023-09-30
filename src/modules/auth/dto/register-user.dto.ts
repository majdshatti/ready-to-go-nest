import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueConstraint } from 'src/common/class-validator';
import { User } from 'src/modules/user';

export class RegisterUserDto {
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
}
