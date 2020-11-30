import { spawnSync } from "child_process";

import { green, red } from 'chalk';

import { ICli } from '../../cli.interface';


const {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_DATABASE,
} = process.env;

const dbSql = `DROP DATABASE IF EXISTS ${PG_DATABASE}`;

const userSql = `DROP ROLE IF EXISTS ${PG_USER};`;

const deleteDbAndUserDb = (superuser = `postgres`) => {
  const psql = spawnSync(`psql`, [
    `-U`, superuser,
    `-h`, PG_HOST,
    `-p`, PG_PORT,
    `-c`, dbSql,
    `-c`, userSql
  ]);

  const error = psql.stderr.toString();
  if (error) {
    console.log(red(`Database delete failed: ${error}`));
    process.exit(1);
  }
  return psql.stdout.toString();
};


export const command: ICli = {
  name: `--delete-database`,
  alias: `-ddb`,
  description: {
    text: `delete database and database user`,
    option: `<superuser>[postgres]`,
  },
  async run(superuser: string): Promise<void> {
    const result = await deleteDbAndUserDb(superuser);
    console.log(green(`Database init success: ${result}`));
  }
};
