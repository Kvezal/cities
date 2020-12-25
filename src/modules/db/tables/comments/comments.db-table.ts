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

import { ICommentTableParams } from '../../interfaces';
import { HotelsDbTable } from '../hotels';
import { UsersDbTable } from '../users';


const defaultParams: Partial<ICommentTableParams> = {
  id: ``,
  user: null,
  hotel_id: ``,
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
  public async createOne(value: Partial<ICommentTableParams>, sql?: string): Promise<ICommentTableParams> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./comments.create.sql`)
  public async createAll(list: ICommentTableParams[], sql?: string): Promise<ICommentTableParams[]> {
    return this._dbRequester.createList({
      sql,
      list,
    });
  }

  @GetSql(`./comments.update.sql`)
  public async updateOne(value?: ICommentTableParams, sql?: string): Promise<ICommentTableParams> {
    return this._dbRequester.updateOne({
      sql,
      value,
    });
  }

  @GetSql(`./comments.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne(value?: Partial<ICommentTableParams>, sql?: string): Promise<ICommentTableParams> {
    return this._dbRequester.findOne({
      sql,
      value,
    });
  }

  @GetSql(`./comments.find.sql`)
  @SetDefaultParams(defaultParams)
  public async findAll(value?: Partial<ICommentTableParams>, sql?: string): Promise<ICommentTableParams[]> {
    return this._dbRequester.findList<ICommentTableParams>({
      sql,
      value,
    });
  }
}
