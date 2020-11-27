import { UserTypeEntity } from 'domains/entities';

import { UserTypeOrmEntity } from '../../orm-entities';
import { UserTypeMapper } from './user-type-mapper';


const ormEntity: UserTypeOrmEntity = {
  id: `1`,
  title: `title`,
};

describe(`User type Mapper`, () => {
  const entity: UserTypeEntity = UserTypeEntity.create(ormEntity);

  describe(`mapToDomain`, () => {
    it('should call create method of UserTypeEntity', function() {
      UserTypeEntity.create = jest.fn(UserTypeEntity.create);
      UserTypeMapper.mapToDomain(ormEntity);
      expect(UserTypeEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of UserTypeEntity with params', function() {
      UserTypeEntity.create = jest.fn(UserTypeEntity.create);
      UserTypeMapper.mapToDomain(ormEntity);
      expect(UserTypeEntity.create).toHaveBeenCalledWith(ormEntity);
    });

    it('should return create method result of UserTypeEntity', function() {
      UserTypeEntity.create = jest.fn(UserTypeEntity.create).mockReturnValue(entity);
      const result = UserTypeMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return UserTypeOrmEntity', function() {
      const result = UserTypeMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property) {
      const result = UserTypeMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
