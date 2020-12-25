import {
  IUser,
  UserEntity,
} from 'domains/entities';
import { IUserTableParams } from 'modules/db/interfaces';

import { ImageMapper } from '../image';
import { UserTypeMapper } from '../user-type';
import { UserMapper } from './user-mapper';


const userTableParams: IUserTableParams = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  image: {
    id: `1008131ec-cb07-499a-86e4-6674afa31532`,
    title: `title`,
  },
  type: {
    id: `1008131ec-cb07-499a-86e4-6674afa31532`,
    title: `title`,
  },
};

const userEntityParams: IUser = {
  id: userTableParams.id,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  image: {
    id: userTableParams.image.id,
    title: `title`,
  },
  type: {
    id: userTableParams.type.id,
    title: `title`,
  },
};


describe(`User Mapper`, () => {
  const userEntity: UserEntity = UserEntity.create(userEntityParams);

  describe(`mapToDomain`, () => {
    it('should call create method of UserEntity', function() {
      UserEntity.create = jest.fn(UserEntity.create);
      UserMapper.mapToDomain(userTableParams);
      expect(UserEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of UserEntity with params', function() {
      UserEntity.create = jest.fn(UserEntity.create);
      UserMapper.mapToDomain(userTableParams);
      expect(UserEntity.create).toHaveBeenCalledWith({
        ...userEntityParams,
        type: UserTypeMapper.mapToDomain(userEntityParams.type),
        image: ImageMapper.mapToDomain(userEntityParams.image)
      });
    });

    it('should return create method result of UserEntity', function() {
      UserEntity.create = jest.fn(UserEntity.create).mockReturnValue(userEntity);
      const result: UserEntity = UserMapper.mapToDomain(userTableParams);
      expect(result).toEqual(userEntity);
    });

    it.each([`id`, `name`, `email`, `password`, `image`, `type`])('should have %p property in result', function(property: string) {
      const result: UserEntity = UserMapper.mapToDomain(userTableParams);
      expect(result).toHaveProperty(property);
    });
  });

  describe(`mapToTableParams`, () => {
    it('should return UserOrmEntity', function() {
      const result: IUserTableParams = UserMapper.mapToTableParams(userEntity);
      expect(result).toEqual(userTableParams);
    });

    it.each([`id`, `name`, `email`, `password`, `image`, `type`])('should have %p property in result', function(property: string) {
      const result: IUserTableParams = UserMapper.mapToTableParams(userEntity);
      expect(result).toHaveProperty(property);
    });
  });
});
