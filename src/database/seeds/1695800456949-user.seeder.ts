import { User } from 'src/modules/user';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { v4 as uuid } from 'uuid';

export class UserSeeder1695800456949 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    await repository.insert([
      {
        _id: uuid(),
        username: 'Majd',
        email: 'majdshatti8@gmail.com',
        type: 'admin',
        password: 'majdshatti',
        loginStrategy: 'jwt',
      },
      {
        _id: uuid(),
        username: 'NormalUser',
        email: 'majdshatti@gmail.com',
        type: 'end-user',
        password: 'majdshatti',
        loginStrategy: 'jwt',
      },
    ]);
  }
}
