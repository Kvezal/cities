import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { UserTypeEntity } from 'domains/entities';
import { LoadUserTypeByTitlePort } from 'domains/ports';

import { UserTypeMapper } from '../../mappers';
import { UserTypesDbTable } from 'modules/db';
import { IUserTypeTableParams } from 'modules/db/interfaces';


@Injectable()
export class UserTypeAdapterService implements LoadUserTypeByTitlePort {
  constructor(
    @Inject(UserTypesDbTable) private readonly _userTypesDbTable: UserTypesDbTable,
  ) {
  }

  public async loadUserTypeByTitle(title: string): Promise<UserTypeEntity> {
    const userType: IUserTypeTableParams = await this._userTypesDbTable.findOne({ title });
    return UserTypeMapper.mapToDomain(userType);
  }
}
