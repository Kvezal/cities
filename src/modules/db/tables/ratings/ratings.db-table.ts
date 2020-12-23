import {
  DbRequester,
  IDbCreateAllRecords,
  IDbCreateOneRecord,
  IDbFindAllRecords,
  IDbFindOneRecord,
  IDbUpdateOneRecord,
  IRowParams,
  GetSql,
  DbTable,
  SetDefaultParams
} from 'nd-sql';
import { HotelsDbTable } from '../hotels';
import { UsersDbTable } from '../users';


const defaultParams = {
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
  public async createOne<Type>(value, sql?: string): Promise<Type> {
    return this._dbRequester.createOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./ratings.create.sql`)
  public async createAll<Type>(list, sql?: string): Promise<Type[]> {
    return this._dbRequester.createList<Type>({
      sql,
      list,
    });
  }

  @GetSql(`./ratings.update.sql`)
  public async updateOne<Type>(value?: Type, sql?: string): Promise<Type> {
    return this._dbRequester.updateOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./ratings.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne<Type>(value?: IRowParams, sql?: string): Promise<Type> {
    return this._dbRequester.findOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./ratings.find.sql`)
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
