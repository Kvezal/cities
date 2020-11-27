import { UserEntity } from 'domains/entities';

import { ImageMapper, UserTypeMapper } from '../../mappers';
import { UserOrmEntity } from '../../orm-entities';
import { UserMapper } from './user-mapper';


const ormEntity: UserOrmEntity = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  image: {
    id: `1`,
    title: `title`,
  },
  type: {
    id: `1`,
    title: `title`,
  },
};

describe(`User Mapper`, () => {
  const entity: UserEntity = UserEntity.create(ormEntity);

  describe(`mapToDomain`, () => {
    it('should call create method of UserEntity', function() {
      UserEntity.create = jest.fn(UserEntity.create);
      UserMapper.mapToDomain(ormEntity);
      expect(UserEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of UserEntity with params', function() {
      UserEntity.create = jest.fn(UserEntity.create);
      UserMapper.mapToDomain(ormEntity);
      expect(UserEntity.create).toHaveBeenCalledWith({
        ...ormEntity,
        type: UserTypeMapper.mapToDomain(ormEntity.type),
        image: ImageMapper.mapToDomain(ormEntity.image)
      });
    });

    it('should return create method result of UserEntity', function() {
      UserEntity.create = jest.fn(UserEntity.create).mockReturnValue(entity);
      const result = UserMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return UserOrmEntity', function() {
      const result = UserMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([`id`, `name`, `email`, `password`, `image`, `type`])('should have %p property in result', function(property) {
      const result = UserMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
