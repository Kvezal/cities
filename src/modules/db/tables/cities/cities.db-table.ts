import {
  DbRequester,
  IDbCreateAllRecords,
  IDbCreateOneRecord,
  IDbFindAllRecords,
  IDbFindOneRecord,
  IRowParams,
  GetSql,
  DbTable,
  SetDefaultParams,
} from 'nd-sql';
import { LocationsDbTable } from '../locations';

const defaultParams = {
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
  public async createOne<Type>(value: Type, sql?: string): Promise<Type> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./cities.create.sql`)
  public createAll<Type>(list: Type[], sql?: string): Promise<Type[]> {
    return this._dbRequester.createList<Type>({
      sql,
      list,
    });
  }

  @GetSql(`./cities.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne<Type>(value?: IRowParams, sql?: string): Promise<Type> {
    return this._dbRequester.findOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./cities.find.sql`)
  @SetDefaultParams(defaultParams)
  public findAll<Type>(value?: IRowParams, sql?: string): Promise<Type[]> {
    return this._dbRequester.findList<Type>({
      sql,
      value,
    });
  }
}
