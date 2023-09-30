import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entity, column = null] = args.constraints;

    if (!value || !column || !entity) return false;

    const repo = this.dataSource.getRepository(entity);
    const record = await repo.findOneBy({ [column]: value });

    return !record;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be unique.`;
  }
}
