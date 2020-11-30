import { createConnection, Connection } from 'typeorm';

import * as entities from '../../../modules/adapters/orm-entities';
import { ICli } from '../../cli.interface';


const {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
} = process.env;

const initDatabaseTables = async (isForce: boolean) => {
  const connection: Connection = await createConnection({
    type: `postgres`,
    host: PG_HOST,
    port: Number(PG_PORT),
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    entities: Object.values(entities),
    synchronize: isForce,
    logging: true,

  });
  await connection.close();
};


export const command: ICli = {
  name: `--init-database-tables`,
  alias: `-idbt`,
  description: {
    text: `init all database tables`,
    option: `<force>[force]`
  },
  async run(force: string): Promise<void> {
    const isForce = force === `force`;
    await initDatabaseTables(isForce);
  }
};
