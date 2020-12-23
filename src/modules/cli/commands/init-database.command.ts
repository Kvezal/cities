import { red } from 'chalk';
import {
  DbConnector,
  EDrivers
} from 'nd-sql';

import { ICli } from '../cli.interface';


import * as dbTablesModule from '../../db/tables';


const userSql = `
  CREATE ROLE ${process.env.DB_USER} WITH
    LOGIN
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD '${process.env.DB_PASSWORD}';
`;

const dbSql = `
  CREATE DATABASE ${process.env.DB_DATABASE}
    WITH
    OWNER = ${process.env.DB_USER}
    TEMPLATE = template0
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
`;

const postgisExtension = `CREATE EXTENSION IF NOT EXISTS "postgis";`;
const uuidOsspExtension = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

const dbRightsSql = `GRANT ALL ON DATABASE ${process.env.DB_DATABASE} TO ${process.env.DB_USER};`;

let hasError = false;

const displayError = (message) => {
  console.log(red(message));
  hasError = true;
}

const initDb = async () => {
  const connector: DbConnector = await DbConnector.init({
    driver: EDrivers.POSTGRE_SQL,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_SUPER_USER_NAME,
    database: process.env.DB_SUPER_DATABASE,
    password: process.env.DB_SUPER_USER_PASSWORD,
    entities: [],
  });
  await connector.query({ text: userSql, values: [] })
    .catch(() => displayError(`user already exists`));
  await connector.query({ text: dbSql, values: [] })
    .catch(() => displayError(`database already exists`));
  await connector.query({ text: dbRightsSql, values: [] })
    .catch(() => displayError(`error setting user rights`));
}

const setDbExtensions = async () => {
  const connector: DbConnector = await DbConnector.init({
    driver: EDrivers.POSTGRE_SQL,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_SUPER_DATABASE,
    database: process.env.DB_DATABASE,
    password: process.env.DB_SUPER_USER_PASSWORD,
    entities: [],
  });
  await connector.query({ text: postgisExtension, values: [] })
    .catch(() => displayError(`POSTGIS extension setting error`));
  await connector.query({ text: uuidOsspExtension, values: [] })
    .catch(() => displayError(`UUID OSSP extension setting error`));
};

const initTables = async (): Promise<void> => {
  await DbConnector.init({
    driver: (process.env.DB_DRIVER as EDrivers),
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    force: true,
    entities: Object.values(dbTablesModule),
  });
};


export const command: ICli = {
  name: `--init-database`,
  alias: `-idb`,
  description: {
    text: `initialize database and database user`,
    option: `<superuser>[postgres]`,
  },
  async run(): Promise<void> {
    await initDb();
    await setDbExtensions();
    await initTables();
    if (hasError) {
      process.exit(1);
    }
  },
};
