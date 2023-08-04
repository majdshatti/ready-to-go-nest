import { IsDefined, IsEmpty, IsIn, IsNotEmpty, IsString,  } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsEmpty()
  @IsString()
  identifier: string;

  @IsDefined()
  @IsEmpty()
  @IsString()
  password: string;
  
  @IsIn(['jwt', 'google', 'facebook'])
  strategy: string = 'jwt';
}
