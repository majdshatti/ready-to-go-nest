// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/user';
import { v4 as uuid } from 'uuid';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(User);

    await repository.insert([
      {
        _id: uuid(),
        username: 'Admin',
        email: 'majdshatti8@gmail.com',
        password: 'majdshatti',
        loginStrategy: 'jwt',
      },
      {
        _id: uuid(),
        username: 'NormalUser',
        email: 'majdshatti@gmail.com',
        password: 'majdshatti',
        loginStrategy: 'jwt',
      },
    ]);
  }
}
