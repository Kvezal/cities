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

import { IFeatureTableParams } from '../../interfaces';


const defaultParams: IFeatureTableParams = {
  id: ``,
  title: ``,
};

@DbTable({
  init: `./features.init.sql`,
  drop: `./features.drop.sql`,
  initData: `./features.init-data.sql`,
})
export class FeaturesDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindOneRecord,
    IDbFindAllRecords {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./features.create.sql`)
  public async createOne(value: IFeatureTableParams, sql?: string): Promise<IFeatureTableParams> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./features.create.sql`)
  public async createAll(list: IFeatureTableParams[], sql?: string): Promise<IFeatureTableParams[]> {
    return this._dbRequester.createList({
      sql,
      list,
    });
  }

  @GetSql(`./features.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value?: IFeatureTableParams, sql?: string): Promise<IFeatureTableParams> {
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }

  @GetSql(`./features.find.sql`)
  @SetDefaultParams(defaultParams)
  public async findAll(
    value?: IFeatureTableParams,
    sql?: string,
  ): Promise<IFeatureTableParams[]> {
    return this._dbRequester.findList({
      sql,
      value,
    });
  }
}
