import { DynamicModule, Module } from "@nestjs/common";

import { DbConnector, DbRequester, EDrivers, IDbConnectorConfig } from "nd-sql";

@Module({})
export class DbModule {
  static async forRoot(config: Partial<IDbConnectorConfig>): Promise<DynamicModule> {
    const connector: DbConnector = await DbConnector.init({
      driver: config.driver || (process.env.DB_DRIVER as EDrivers),
      host: config.host || process.env.DB_HOST,
      port: config.port || Number(process.env.DB_PORT),
      user: config.user || process.env.DB_USER,
      database: config.database || process.env.DB_DATABASE,
      password: config.password || process.env.DB_PASSWORD,
      force: config.force || process.env.DB_FORCE.toLowerCase() === `true`,
      entities: config.entities,
    });

    const dbRequester = {
      provide: DbRequester,
      useValue: new DbRequester(connector),
    };
    const services = config.entities.map((Repository) => ({
      provide: Repository,
      useFactory: (dbRequester: DbRequester) => new Repository(dbRequester),
      inject: [DbRequester],
    }));
    return {
      module: DbModule,
      providers: [dbRequester, ...services],
      exports: [dbRequester, ...services],
    };
  }
}
