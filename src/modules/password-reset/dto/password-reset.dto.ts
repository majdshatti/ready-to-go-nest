import { MinLength, MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class PasswordResetDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;

  @IsNotEmpty()
  resetToken: string;
}
