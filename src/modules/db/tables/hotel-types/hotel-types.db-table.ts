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

const defaultParams = {
  id: ``,
  title: ``,
};

@DbTable({
  dependencies: [],
  init: `./hotel-types.init.sql`,
  drop: `./hotel-types.drop.sql`,
  initData: `./hotel-types.init-data.sql`,
})
export class HotelTypesDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindOneRecord,
    IDbFindAllRecords {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./hotel-types.create.sql`)
  public async createOne<Type>(value, sql?: string): Promise<Type> {
    return this._dbRequester.createOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./hotel-types.create.sql`)
  public async createAll<Type>(list, sql?: string): Promise<Type[]> {
    return this._dbRequester.createList<Type>({
      sql,
      list,
    });
  }

  @GetSql(`./hotel-types.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne<Type>(value: IRowParams, sql?: string): Promise<Type> {
    return this._dbRequester.findOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./hotel-types.find.sql`)
  @SetDefaultParams(defaultParams)
  public async findAll<Type>(
    value?: IRowParams,
    sql?: string,
  ): Promise<Type[]> {
    return this._dbRequester.findList<Type>({
      sql,
      value,
    });
  }
}
