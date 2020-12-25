import {
  IUserType,
  UserTypeEntity,
} from 'domains/entities';
import { IUserTypeTableParams } from 'modules/db/interfaces';

import { UserTypeMapper } from './user-type-mapper';


const userTypeTableParams: IUserTypeTableParams = {
  id: `1`,
  title: `title`,
};

const userTypeEntityParams: IUserType = {
  id: userTypeTableParams.id,
  title: userTypeTableParams.title,
};

describe(`User type Mapper`, () => {
  const userTypeEntity: UserTypeEntity = UserTypeEntity.create(userTypeEntityParams);

  describe(`mapToDomain`, () => {
    it('should call create method of UserTypeEntity', function() {
      UserTypeEntity.create = jest.fn(UserTypeEntity.create);
      UserTypeMapper.mapToDomain(userTypeTableParams);
      expect(UserTypeEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of UserTypeEntity with params', function() {
      UserTypeEntity.create = jest.fn(UserTypeEntity.create);
      UserTypeMapper.mapToDomain(userTypeTableParams);
      expect(UserTypeEntity.create).toHaveBeenCalledWith(userTypeTableParams);
    });

    it('should return create method result of UserTypeEntity', function() {
      UserTypeEntity.create = jest.fn(UserTypeEntity.create).mockReturnValue(userTypeEntity);
      const result: UserTypeEntity = UserTypeMapper.mapToDomain(userTypeTableParams);
      expect(result).toEqual(userTypeEntity);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property: string) {
      const result: IUserTypeTableParams = UserTypeMapper.mapToDomain(userTypeTableParams);
      expect(result).toHaveProperty(property);
    });
  });

  describe(`mapToTableParams`, () => {
    it('should return UserTypeOrmEntity', function() {
      const result: IUserTypeTableParams = UserTypeMapper.mapToTableParams(userTypeEntity);
      expect(result).toEqual(userTypeTableParams);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property: string) {
      const result: IUserTypeTableParams = UserTypeMapper.mapToTableParams(userTypeEntity);
      expect(result).toHaveProperty(property);
    });
  });
});
