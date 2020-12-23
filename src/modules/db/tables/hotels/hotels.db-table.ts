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
import { HotelTypesDbTable } from '../hotel-types';
import { CitiesDbTable } from '../cities';
import { LocationsDbTable } from '../locations';
import { UsersDbTable } from '../users';


const defaultParams = {
  id: ``,
  isFavorite: false,
  userId: ``,
  title: ``,
  city: null,
  sorting: null,
};

@DbTable({
  dependencies: [
    HotelTypesDbTable,
    CitiesDbTable,
    LocationsDbTable,
    UsersDbTable,
  ],
  init: `./hotels.init.sql`,
  drop: `./hotels.drop.sql`,
})
export class HotelsDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindAllRecords,
    IDbFindOneRecord {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./hotels.create.sql`)
  public async createOne<Type>(value: Type, sql?: string): Promise<Type> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./hotels.create.sql`)
  public createAll<Type>(list: Type[], sql?: string): Promise<Type[]> {
    return this._dbRequester.createList<Type>({
      sql,
      list,
    });
  }

  @GetSql(`./hotels.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne<Type>(value: IRowParams, sql?: string): Promise<Type> {
    return this._dbRequester.findOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./hotels.find.sql`)
  @SetDefaultParams(defaultParams)
  public findAll<Type>(value?: IRowParams, sql?: string): Promise<Type[]> {
    return this._dbRequester.findList<Type>({
      sql,
      value,
    });
  }
}
