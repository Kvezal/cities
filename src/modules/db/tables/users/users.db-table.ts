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
import { ImagesDbTable } from '../images';
import { UserTypesDbTable } from '../user-types';


const defaultParams = {
  id: ``,
  name: ``,
  email: ``,
  type: null,
};

@DbTable({
  dependencies: [
    ImagesDbTable,
    UserTypesDbTable,
  ],
  init: `./users.init.sql`,
  drop: `./users.drop.sql`,
})
export class UsersDbTable
  implements
    IDbCreateOneRecord,
    IDbCreateAllRecords,
    IDbFindAllRecords,
    IDbFindOneRecord {
  constructor(private readonly _dbRequester: DbRequester) {}

  @GetSql(`./users.create.sql`)
  public async createOne<Type>(value: Type, sql?: string): Promise<Type> {
    return this._dbRequester.createOne({
      sql,
      value,
    });
  }

  @GetSql(`./users.create.sql`)
  public createAll<Type>(list: Type[], sql?: string): Promise<Type[]> {
    return this._dbRequester.createList<Type>({
      sql,
      list,
    });
  }

  @GetSql(`./users.find.sql`)
  @SetDefaultParams(defaultParams)
  public findOne<Type>(value: IRowParams, sql?: string): Promise<Type> {
    return this._dbRequester.findOne<Type>({
      sql,
      value,
    });
  }

  @GetSql(`./users.find.sql`)
  @SetDefaultParams(defaultParams)
  public findAll<Type>(value?: IRowParams, sql?: string): Promise<Type[]> {
    return this._dbRequester.findList<Type>({
      sql,
      value,
    });
  }
}
