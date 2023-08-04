import { IsIn, IsNotEmpty, IsString,  } from 'class-validator';
import { LoginDto } from './login.dto';

export class JWTLoginDto extends LoginDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
