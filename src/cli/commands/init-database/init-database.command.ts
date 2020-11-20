import { spawnSync } from 'child_process';

import { green, red } from 'chalk';

import { ICli } from '../../cli.interface';


const {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
} = process.env;

const userSql = `
  CREATE ROLE ${PG_USER} WITH
    LOGIN
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD '${PG_PASSWORD}';
`;

const dbSql = `
  CREATE DATABASE ${PG_DATABASE}
    WITH
    OWNER = ${PG_USER}
    TEMPLATE = template0
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
`;

const dbRightsSql = `GRANT ALL ON DATABASE ${PG_DATABASE} TO ${PG_USER}`;

const initDbAndUserDb = (superuser = `postgres`) => {
  const psql = spawnSync(`psql`, [
    `-U`, superuser,
    `-h`, PG_HOST,
    `-p`, PG_PORT,
    `-c`, userSql,
    `-c`, dbSql,
    `-c`, dbRightsSql
  ]);

  const error = psql.stderr.toString();
  if (error) {
    console.log(red(`Database init failed: ${error}`));
    process.exit(1);
  }
  return psql.stdout.toString();
};

export const command: ICli = {
  name: `--init-database`,
  alias: `-idb`,
  description: {
    text: `initialize database and database user`,
    option: `<superuser>[postgres]`,
  },
  async run(superuser: string): Promise<void> {
    const result = initDbAndUserDb(superuser);
    console.log(green(`Database init success: ${result}`));
  }
};
