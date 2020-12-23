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
  init: `./features.init.sql`,
  drop: `./features.drop.sql`,
  initData: `./features.init-data.sql`,
})
export class FeaturesDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindOneRecord,
    IDbFindAllRecords {
  private _defaultFindParams = {
    id: ``,
    title: ``,
  };

  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./features.create.sql`)
  public async createOne<Type>(value, sql?: string): Promise<Type> {
    return this._dbRequester.createOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./features.create.sql`)
  public async createAll<Type>(list, sql?: string): Promise<Type[]> {
    return this._dbRequester.createList<Type>({
      sql,
      list,
    });
  }

  @GetSql(`./features.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne<Type>(value?: IRowParams, sql?: string): Promise<Type> {
    return this._dbRequester.findOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./features.find.sql`)
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
