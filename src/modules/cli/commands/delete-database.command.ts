import {
  DbConnector,
  EDrivers
} from 'nd-sql';

import { ICli } from '../cli.interface';


const dbSql = `DROP DATABASE IF EXISTS ${process.env.DB_DATABASE}`;

const userSql = `DROP ROLE IF EXISTS ${process.env.DB_USER};`;

const deleteDbAndUser = async () => {
  const connector: DbConnector = await DbConnector.init({
    driver: EDrivers.POSTGRE_SQL,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_SUPER_USER_NAME,
    database: process.env.DB_SUPER_DATABASE,
    password: process.env.DB_SUPER_USER_PASSWORD,
    entities: [],
  });

  await connector.query({ text: dbSql, values: [] });
  await connector.query({ text: userSql, values: [] });
};


export const command: ICli = {
  name: `--delete-database`,
  alias: `-ddb`,
  description: {
    text: `delete database and database user`,
    option: ``,
  },
  async run(): Promise<void> {
    await deleteDbAndUser();
  }
};
