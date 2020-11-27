import {
  Connection as TypeormConnection,
  ConnectionManager as TypeormConnectionManager,
  ConnectionOptions,
  getConnectionOptions,
} from 'typeorm';
import { AlreadyHasActiveConnectionError } from 'typeorm/error/AlreadyHasActiveConnectionError';
import { Driver } from 'typeorm/driver/Driver';
import { DriverFactory } from 'typeorm/driver/DriverFactory';
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver';

import * as entities from '../../../../modules/adapters/orm-entities';

class myFakeDBDriver extends PostgresDriver {
  async connect(): Promise<void> {
    return;
  }
}

class myDriverFactory extends DriverFactory {
  create(connection: Connection): Driver {
    return new myFakeDBDriver(connection);
  }
}

class Connection extends TypeormConnection {
  _driver: Driver;
  get driver(): Driver {
    return this._driver;
  }
  set driver(options: Driver) {
    this._driver = new myDriverFactory().create(this);
  }
}

export class ConnectionManager extends TypeormConnectionManager {
  create(options: ConnectionOptions): Connection {
    const existConnection = this.connections.find(connection => connection.name === (options.name || "default"));
    if (existConnection) {
      if (existConnection.isConnected)
        throw new AlreadyHasActiveConnectionError(options.name || "default");
      this.connections.splice(this.connections.indexOf(existConnection), 1);
    }
    const connection = new Connection(options);
    this.connections.push(connection);
    return connection;
  }
}

const createConnection = jest.fn(async (optionsOrName: ConnectionOptions) => {
  const connectionName = typeof optionsOrName === "string" ? optionsOrName : "default";
  const options = optionsOrName instanceof Object ? optionsOrName : await getConnectionOptions(connectionName);
  return new ConnectionManager().create(options).connect();
});

export const createTestingConnection = () => createConnection({
  name: 'test',
  type: 'postgres',
  entities: Object.values(entities)
} as ConnectionOptions);
