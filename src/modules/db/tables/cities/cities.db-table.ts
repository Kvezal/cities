import {
  DbRequester,
  DbTable,
  GetSql,
  IDbCreateAllRecords,
  IDbCreateOneRecord,
  IDbFindAllRecords,
  IDbFindOneRecord,
  SetDefaultParams,
} from 'nd-sql';

import { ICityTableParams } from '../../interfaces';
import { LocationsDbTable } from '../locations';


const defaultParams: Partial<ICityTableParams> = {
  id: ``,
  title: ``,
};

@DbTable({
  dependencies: [LocationsDbTable],
  init: `./cities.init.sql`,
  drop: `./cities.drop.sql`,
  initData: `./cities.init-data.sql`,
})
export class CitiesDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindAllRecords,
    IDbFindOneRecord {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./cities.create.sql`)
  public async createOne(value: ICityTableParams, sql?: string): Promise<ICityTableParams> {
    return this._dbRequester.createOne<ICityTableParams>({
      sql,
      value,
    });
  }

  @GetSql(`./cities.create.sql`)
  public createAll(list: ICityTableParams[], sql?: string): Promise<ICityTableParams[]> {
    return this._dbRequester.createList({
      sql,
      list,
    });
  }

  @GetSql(`./cities.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value?: Partial<ICityTableParams>, sql?: string): Promise<ICityTableParams> {
    return this._dbRequester.findOne<ICityTableParams>({
      sql,
      value,
    });
  }

  @GetSql(`./cities.find.sql`)
  @SetDefaultParams(defaultParams)
  public findAll(value?: Partial<ICityTableParams>, sql?: string): Promise<ICityTableParams[]> {
    return this._dbRequester.findList<ICityTableParams>({
      sql,
      value,
    });
  }
}
