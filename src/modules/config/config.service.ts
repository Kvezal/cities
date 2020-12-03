import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';


export class ConfigService {
  private _env = process.env;

  static getTypeOrmConfig(env): TypeOrmModuleOptions {
    const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE } = env;
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

  public getGlobalEnvironmentVariable(name: string): string {
    return this._env[name];
  }
}
