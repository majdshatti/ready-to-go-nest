import { IsNotEmpty, IsOptional } from 'class-validator';
import { QueryFilterDto } from 'src/modules/filter';

export class UserQueryFilterDto extends QueryFilterDto {
  @IsOptional()
  @IsNotEmpty()
  loginStrategy: string;
}
