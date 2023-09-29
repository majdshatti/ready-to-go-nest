import { IsNotEmpty, IsOptional } from 'class-validator';

export class QueryFilterDto {
  @IsOptional()
  @IsNotEmpty()
  page?: number;

  @IsOptional()
  @IsNotEmpty()
  limit?: number;

  @IsOptional()
  @IsNotEmpty()
  sortBy?: [[string, string]];

  @IsOptional()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @IsNotEmpty()
  filter?: {
    [key: string]: string;
  };
}
