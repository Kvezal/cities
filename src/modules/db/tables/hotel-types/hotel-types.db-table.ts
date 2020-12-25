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

import { IHotelTypeTableParams } from '../../interfaces';


const defaultParams: IHotelTypeTableParams = {
  id: ``,
  title: ``,
};

@DbTable({
  dependencies: [],
  init: `./hotel-types.init.sql`,
  drop: `./hotel-types.drop.sql`,
  initData: `./hotel-types.init-data.sql`,
})
export class HotelTypesDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindOneRecord,
    IDbFindAllRecords {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./hotel-types.create.sql`)
  public async createOne<Type>(value, sql?: string): Promise<Type> {
    return this._dbRequester.createOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./hotel-types.create.sql`)
  public async createAll<Type>(list, sql?: string): Promise<Type[]> {
    return this._dbRequester.createList<Type>({
      sql,
      list,
    });
  }

  @GetSql(`./hotel-types.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value: IHotelTypeTableParams, sql?: string): Promise<IHotelTypeTableParams> {
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }

  @GetSql(`./hotel-types.find.sql`)
  @SetDefaultParams(defaultParams)
  public async findAll(
    value?: IHotelTypeTableParams,
    sql?: string,
  ): Promise<IHotelTypeTableParams[]> {
    return this._dbRequester.findList({
      sql,
      value,
    });
  }
}
