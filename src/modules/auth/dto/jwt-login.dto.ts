import { IsNotEmpty, IsString } from 'class-validator';
import { LoginDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class JWTLoginDto extends LoginDto {
  @ApiProperty({ description: 'could be username and could be email' })
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
