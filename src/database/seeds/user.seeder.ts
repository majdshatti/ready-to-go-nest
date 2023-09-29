import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/user';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        _id: uuid(),
        username: 'Majd',
        email: 'majdshatti8@gmail.com',
        type: 'admin',
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, salt),
        loginStrategy: 'jwt',
      },
      {
        _id: uuid(),
        username: 'NormalUser',
        email: 'majdshatti@gmail.com',
        type: 'end-user',
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, salt),
        loginStrategy: 'jwt',
      },
    ]);
  }
}
