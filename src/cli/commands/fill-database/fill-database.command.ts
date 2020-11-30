import { green } from 'chalk';
import { Connection, createConnection } from 'typeorm';

import { ICli } from '../../cli.interface';
import { cityParams, hotelParams, userParams } from './data';
import { DatabaseFiller } from './database-filler';
import { connectionOptions } from './orm-config';


export const command: ICli = {
  name: `--fill-database`,
  alias: `-fdb`,
  description: {
    text: `delete database and database user`,
    option: `<superuser>[postgres]`,
  },
  async run(count: string): Promise<void> {
    const recordCount = Number(count) || 0;
    const connection: Connection = await createConnection(connectionOptions);
    const databaseFiller = new DatabaseFiller(connection, {
      cities: cityParams,
      hotels: hotelParams,
      users: userParams,
    });
    await databaseFiller.fill(recordCount);
    await connection.close();
    console.log(green(`Database filled successfully`));
  }
};
