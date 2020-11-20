import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import * as entities from '../../../modules/orm-entities';


const {
  PG_HOST: host,
  PG_PORT: port,
  PG_USER: username,
  PG_PASSWORD: password,
  PG_DATABASE: database,
} = process.env;

export const connectionOptions: PostgresConnectionOptions = {
  type: `postgres`,
  host,
  port: Number(port),
  username,
  password,
  database,
  entities: Object.values(entities),
  synchronize: true,
  logging: `all`,
};
