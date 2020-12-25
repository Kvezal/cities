import {
  DbRequester,
  IDbCreateAllRecords,
  IDbCreateOneRecord,
  IDbFindAllRecords,
  IDbFindOneRecord,
  IDbUpdateOneRecord,
  GetSql,
  DbTable,
  SetDefaultParams
} from 'nd-sql';

import { IRatingTableParams } from '../../interfaces';
import { HotelsDbTable } from '../hotels';
import { UsersDbTable } from '../users';


const defaultParams: Partial<IRatingTableParams> = {
  user_id: ``,
  hotel_id: ``,
};

@DbTable({
  dependencies: [
    HotelsDbTable,
    UsersDbTable,
  ],
  init: `./ratings.init.sql`,
  drop: `./ratings.drop.sql`,
})
export class RatingsDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbUpdateOneRecord,
    IDbFindOneRecord,
    IDbFindAllRecords {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./ratings.create.sql`)
  public async createOne(value: IRatingTableParams, sql?: string): Promise<IRatingTableParams> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./ratings.create.sql`)
  public async createAll<Type>(list: IRatingTableParams[], sql?: string): Promise<IRatingTableParams[]> {
    return this._dbRequester.createList({
      sql,
      list,
    });
  }

  @GetSql(`./ratings.update.sql`)
  public async updateOne(value?: Partial<IRatingTableParams>, sql?: string): Promise<IRatingTableParams> {
    return this._dbRequester.updateOne({
      sql,
      value,
    });
  }

  @GetSql(`./ratings.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value?: IRatingTableParams, sql?: string): Promise<IRatingTableParams> {
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }

  @GetSql(`./ratings.find.sql`)
  @SetDefaultParams(defaultParams)
  public async findAll(value?: IRatingTableParams, sql?: string): Promise<IRatingTableParams[]> {
    return this._dbRequester.findList({
      sql,
      value,
    });
  }
}
