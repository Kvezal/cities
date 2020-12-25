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

import { IUserTableParams } from '../../interfaces';
import { ImagesDbTable } from '../images';
import { UserTypesDbTable } from '../user-types';


const defaultParams: Partial<IUserTableParams> = {
  id: ``,
  name: ``,
  email: ``,
  type: null,
};

@DbTable({
  dependencies: [
    ImagesDbTable,
    UserTypesDbTable,
  ],
  init: `./users.init.sql`,
  drop: `./users.drop.sql`,
})
export class UsersDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindAllRecords,
    IDbFindOneRecord {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./users.create.sql`)
  public async createOne(value: IUserTableParams, sql?: string): Promise<IUserTableParams> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./users.create.sql`)
  public createAll(list: IUserTableParams[], sql?: string): Promise<IUserTableParams[]> {
    return this._dbRequester.createList({
      sql,
      list,
    });
  }

  @GetSql(`./users.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value: Partial<IUserTableParams>, sql?: string): Promise<IUserTableParams> {
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }

  @GetSql(`./users.find.sql`)
  @SetDefaultParams(defaultParams)
  public findAll(value?: Partial<IUserTableParams>, sql?: string): Promise<IUserTableParams[]> {
    return this._dbRequester.findList({
      sql,
      value,
    });
  }
}
