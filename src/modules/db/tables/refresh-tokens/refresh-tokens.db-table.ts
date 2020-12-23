import {
  DbRequester,
  IDbCreateOneRecord,
  IDbFindOneRecord,
  IDbRemoveOneRecord,
  IRowParams,
  GetSql,
  DbTable,
  SetDefaultParams,
} from 'nd-sql';


@DbTable({
  init: `./refresh-tokens.init.sql`,
  drop: `./refresh-tokens.drop.sql`,
})
export class RefreshTokensDbTable
  implements
    IDbCreateOneRecord,
    IDbFindOneRecord,
    IDbRemoveOneRecord {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./refresh-tokens.create.sql`)
  public async createOne<Type>(value, sql?: string): Promise<Type> {
    return this._dbRequester.createOne<Type>({
      sql,
      value
    });
  }

  @GetSql(`./refresh-tokens.remove.sql`)
  public async removeOne<Type>(value, sql?: string): Promise<Type> {
    return this._dbRequester.removeOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./refresh-tokens.find.sql`)
  @SetDefaultParams({ value: `` })
  public findOne<Type>(value?: IRowParams, sql?: string): Promise<Type> {
    return this._dbRequester.findOne<Type>({
      sql,
      value,
    });
  }
}
