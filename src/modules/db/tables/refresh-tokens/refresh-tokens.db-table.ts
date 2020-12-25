import {
  DbRequester,
  IDbCreateOneRecord,
  IDbFindOneRecord,
  IDbRemoveOneRecord,
  GetSql,
  DbTable,
  SetDefaultParams,
} from 'nd-sql';

import { IRefreshTokenTableParams } from '../../interfaces';


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
  public async createOne(value: IRefreshTokenTableParams, sql?: string): Promise<IRefreshTokenTableParams> {
    return this._dbRequester.createOne({
      sql,
      value
    });
  }


  @GetSql(`./refresh-tokens.remove.sql`)
  public async removeOne(value: IRefreshTokenTableParams, sql?: string): Promise<IRefreshTokenTableParams> {
    return this._dbRequester.removeOne({
      sql,
      value,
    });
  }


  @GetSql(`./refresh-tokens.find.sql`)
  @SetDefaultParams({ value: `` })
  public findOne(value?: IRefreshTokenTableParams, sql?: string): Promise<IRefreshTokenTableParams> {
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }
}
