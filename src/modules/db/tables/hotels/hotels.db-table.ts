import {
  DbRequester,
  DbTable,
  GetSql,
  IDbCreateAllRecords,
  IDbCreateOneRecord,
  IDbFindAllRecords,
  IDbFindOneRecord,
  SetDefaultParams,
} from 'nd-sql';

import { IHotelTableParams } from 'modules/db/interfaces';

import { CitiesDbTable } from '../cities';
import { HotelTypesDbTable } from '../hotel-types';
import { LocationsDbTable } from '../locations';
import { UsersDbTable } from '../users';


const defaultParams = {
  id: ``,
  is_favorite: false,
  user_id: ``,
  title: ``,
  city: null,
  sorting: ``,
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
  public async createOne(value: IHotelTableParams, sql?: string): Promise<IHotelTableParams> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./hotels.create.sql`)
  public createAll(list: IHotelTableParams[], sql?: string): Promise<IHotelTableParams[]> {
    return this._dbRequester.createList({
      sql,
      list,
    });
  }

  @GetSql(`./hotels.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value: any, sql?: string): Promise<IHotelTableParams> {
    console.log(value);
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }

  @GetSql(`./hotels.find.sql`)
  @SetDefaultParams(defaultParams)
  public findAll(value?: any, sql?: string): Promise<IHotelTableParams[]> {
    console.log(value);
    return this._dbRequester.findList({
      sql,
      value,
    });
  }
}
