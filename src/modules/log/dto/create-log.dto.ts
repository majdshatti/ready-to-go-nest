import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogDto {
  @IsNumber()
  statusCode: number;

  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  path: string;
}
