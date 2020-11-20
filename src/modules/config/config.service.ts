import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';


class ConfigService {
  constructor(private readonly _env: { [k: string]: string | undefined }) { }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE } = this._env;
    return {
      type: 'postgres',
      host: PG_HOST,
      port: Number(PG_PORT),
      username: PG_USER,
      password: PG_PASSWORD,
      database: PG_DATABASE,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    };
  }
}

export const configService = new ConfigService(process.env);
