import {
  DbRequester,
  IDbCreateAllRecords,
  IDbCreateOneRecord,
  IDbFindAllRecords,
  IDbFindOneRecord,
  GetSql,
  DbTable,
  SetDefaultParams,
} from 'nd-sql';

import { IUserTypeTableParams } from '../../interfaces';


const defaultParams: IUserTypeTableParams = {
  id: ``,
  title: ``,
};

@DbTable({
  init: `./user-types.init.sql`,
  drop: `./user-types.drop.sql`,
  initData: `./user-types.init-data.sql`,
})
export class UserTypesDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindOneRecord,
    IDbFindAllRecords {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./user-types.create.sql`)
  public async createOne(value: IUserTypeTableParams, sql?: string): Promise<IUserTypeTableParams> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./user-types.create.sql`)
  public async createAll(list, sql?: string): Promise<IUserTypeTableParams[]> {
    return this._dbRequester.createList({
      sql,
      list,
    });
  }

  @GetSql(`./user-types.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value?: Partial<IUserTypeTableParams>, sql?: string): Promise<IUserTypeTableParams> {
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }

  @GetSql(`./user-types.find.sql`)
  @SetDefaultParams(defaultParams)
  public async findAll(value?: Partial<IUserTypeTableParams>, sql?: string): Promise<IUserTypeTableParams[]> {
    return this._dbRequester.findList({
      sql,
      value,
    });
  }
}
