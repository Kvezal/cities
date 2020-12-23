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
import { HotelsDbTable } from '../hotels';
import { UsersDbTable } from '../users';

const defaultParams = {
  id: ``,
  userId: ``,
  hotelId: ``,
};

@DbTable({
  dependencies: [
    HotelsDbTable,
    UsersDbTable,
  ],
  init: `./comments.init.sql`,
  drop: `./comments.drop.sql`,
})
export class CommentsDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindOneRecord,
    IDbFindAllRecords {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./comments.create.sql`)
  public async createOne<Type>(value, sql?: string): Promise<Type> {
    return this._dbRequester.createOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./comments.create.sql`)
  public async createAll<Type>(list, sql?: string): Promise<Type[]> {
    return this._dbRequester.createList<Type>({
      sql,
      list,
    });
  }

  @GetSql(`./comments.update.sql`)
  public async updateOne<Type>(value?: Type, sql?: string): Promise<Type> {
    return this._dbRequester.updateOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./comments.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne<Type>(value?: IRowParams, sql?: string): Promise<Type> {
    return this._dbRequester.findOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./comments.find.sql`)
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
