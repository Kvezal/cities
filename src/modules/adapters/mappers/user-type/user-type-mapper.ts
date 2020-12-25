import { UserTypeEntity } from 'domains/entities';
import { IUserTypeTableParams } from 'modules/db/interfaces';


export class UserTypeMapper {
  static mapToDomain(tableParams: IUserTypeTableParams): UserTypeEntity {
    return UserTypeEntity.create({
      id: tableParams.id,
      title: tableParams.title,
    });
  }

  static mapToTableParams(domain: UserTypeEntity): IUserTypeTableParams {
    return {
      id: domain.id,
      title: domain.title,
    };
  }
}
