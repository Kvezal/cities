import * as dbTablesModule from '../../../db/tables';
import { DbConnector, DbRequester, EDrivers } from 'nd-sql';
import { ICli } from '../../cli.interface';
import {
  cityParams,
  hotelParams,
  userParams
} from './data';
import {
  CommentsDbTable,
  FavoritesDbTable,
  FeaturesDbTable,
  HotelsDbTable,
  UsersDbTable
} from '../../../db/tables';
import { TablesDataCreator } from './tables-data-creator';


const getRequester = async (): Promise<DbRequester> => {
  const connector: DbConnector = await DbConnector.init({
    driver: (process.env.DB_DRIVER as EDrivers),
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    force: false,
    entities: Object.values(dbTablesModule),
  });
  return new DbRequester(connector);
};

const getFeatures = async (requester: DbRequester) => {
  const featuresTable = new FeaturesDbTable(requester);
  return featuresTable.findAll();
};

const fillTable = async (TableClass, requester, values): Promise<void> => {
  const table = new TableClass(requester);
  await table.createAll(values);
};

export const command: ICli = {
  name: `--fill-database`,
  alias: `-fdb`,
  description: {
    text: `delete database and database user`,
    option: ``,
  },
  async run(count: string): Promise<void> {
    const recordCount = Number(count) || 0;
    const requester = await getRequester();
    const features = await getFeatures(requester);
    const dbTablesData = await TablesDataCreator.getData(
      recordCount,
      features,
      cityParams,
      hotelParams,
      userParams,
    );
    await fillTable(UsersDbTable, requester, dbTablesData.users);
    await fillTable(HotelsDbTable, requester, dbTablesData.hotels);
    await fillTable(CommentsDbTable, requester, dbTablesData.comments);
    await fillTable(FavoritesDbTable, requester, dbTablesData.favorites);
  },
};
