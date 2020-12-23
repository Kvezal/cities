import {
  DbRequester,
  IDbCreateAllRecords,
  IDbCreateOneRecord,
  IDbFindAllRecords,
  IDbFindOneRecord,
  IDbRemoveOneRecord,
  IRowParams,
  GetSql,
  DbTable,
  SetDefaultParams,
} from 'nd-sql';
import { UsersDbTable } from '../users';
import { HotelsDbTable } from '../hotels';



const defaultParams = {
  hotel_id: ``,
  user_id: ``,
};

@DbTable({
  dependencies: [
    UsersDbTable,
    HotelsDbTable,
  ],
  init: `./favorites.init.sql`,
  drop: `./favorites.drop.sql`,
})
export class FavoritesDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindAllRecords,
    IDbFindOneRecord,
    IDbRemoveOneRecord {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./favorites.create.sql`)
  public async createOne<Type>(value: Type, sql?: string): Promise<Type> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./favorites.create.sql`)
  public createAll<Type>(list: Type[], sql?: string): Promise<Type[]> {
    return this._dbRequester.createList<Type>({
      sql,
      list,
    });
  }

  @GetSql(`./favorites.remove.sql`)
  public removeOne<Type>(value?: Type, sql?: string): Promise<Type> {
    return this._dbRequester.removeOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./favorites.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne<Type>(value: IRowParams, sql?: string): Promise<Type> {
    return this._dbRequester.findOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./favorites.find.sql`)
  @SetDefaultParams(defaultParams)
  public findAll<Type>(value?: IRowParams, sql?: string): Promise<Type[]> {
    return this._dbRequester.findList<Type>({
      sql,
      value,
    });
  }
}
