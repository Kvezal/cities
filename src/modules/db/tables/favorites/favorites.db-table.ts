import {
  DbRequester,
  DbTable,
  GetSql,
  IDbCreateAllRecords,
  IDbCreateOneRecord,
  IDbFindAllRecords,
  IDbFindOneRecord,
  IDbRemoveOneRecord,
  SetDefaultParams,
} from 'nd-sql';

import { IFavoriteTableParams } from '../../interfaces';
import { HotelsDbTable } from '../hotels';
import { UsersDbTable } from '../users';


const defaultParams: IFavoriteTableParams = {
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
  public async createOne<Type>(value: IFavoriteTableParams, sql?: string): Promise<IFavoriteTableParams> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./favorites.create.sql`)
  public createAll(list: IFavoriteTableParams[], sql?: string): Promise<IFavoriteTableParams[]> {
    return this._dbRequester.createList({
      sql,
      list,
    });
  }

  @GetSql(`./favorites.remove.sql`)
  public async removeOne(value?: Partial<IFavoriteTableParams>, sql?: string): Promise<IFavoriteTableParams> {
    return this._dbRequester.removeOne({
      sql,
      value,
    });
  }

  @GetSql(`./favorites.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value: IFavoriteTableParams, sql?: string): Promise<IFavoriteTableParams> {
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }

  @GetSql(`./favorites.find.sql`)
  @SetDefaultParams(defaultParams)
  public findAll(value?: Partial<IFavoriteTableParams>, sql?: string): Promise<IFavoriteTableParams[]> {
    return this._dbRequester.findList<IFavoriteTableParams>({
      sql,
      value,
    });
  }
}
