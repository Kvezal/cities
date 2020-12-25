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

import { IImageTableParams } from '../../interfaces';


const defaultParams: IImageTableParams = {
  id: ``,
  title: ``,
};

@DbTable({
  init: `./images.init.sql`,
  drop: `./images.drop.sql`,
})
export class ImagesDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindOneRecord,
    IDbFindAllRecords {
  constructor(private readonly _dbRequester: DbRequester) {}


  @GetSql(`./images.create.sql`)
  public async createOne(value: IImageTableParams, sql?: string): Promise<IImageTableParams> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }


  @GetSql(`./images.create.sql`)
  public async createAll(list: IImageTableParams[], sql?: string): Promise<IImageTableParams[]> {
    return this._dbRequester.createList({
      sql,
      list,
    });
  }


  @GetSql(`./images.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value?: IImageTableParams, sql?: string): Promise<IImageTableParams[]> {
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }


  @GetSql(`./images.find.sql`)
  @SetDefaultParams(defaultParams)
  public async findAll(value?: IImageTableParams, sql?: string): Promise<IImageTableParams[]> {
    return this._dbRequester.findList({
      sql,
      value,
    });
  }
}
