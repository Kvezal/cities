import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUser, UserEntity } from 'domains/entities';
import { UserAdapterService } from 'modules/adapters';
import { UserMapper } from 'modules/mappers';
import { UserOrmEntity } from 'modules/orm-entities';


const userOrmEntity: IUser = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  type: {
    id: `1`,
    title: `title`,
  },
  image: {
    id: `1`,
    title: `title`,
  },
};

describe(`User Adapter Service`, () => {
  let service: UserAdapterService;
  let repository: Repository<UserOrmEntity>;
  const userEntity: UserEntity = UserEntity.create(userOrmEntity);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserAdapterService,
        {
          provide: getRepositoryToken(UserOrmEntity),
          useClass: Repository,
        },
      ],
    }).compile();
    service = testModule.get<UserAdapterService>(UserAdapterService);
    repository = testModule.get<Repository<UserOrmEntity>>(getRepositoryToken(UserOrmEntity));
  });

  it(`should define service`, () => {
    expect(service).toBeDefined();
  });

  describe(`loadUserById method`, () => {
    it(`should call findOne method of repository`, async () => {
      const findOne = jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userOrmEntity);
      await service.loadUserById(userOrmEntity.id);
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of UserMapper`, async () => {
      jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
      await service.loadUserById(userOrmEntity.id);
      expect(UserMapper.mapToDomain).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of UserMapper with params`, async () => {
      jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
      await service.loadUserById(userOrmEntity.id);
      expect(UserMapper.mapToDomain).toHaveBeenCalledWith(userOrmEntity);
    });

    it(`should return result of mapToDomain method`, async () => {
      jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userOrmEntity);
      jest.fn(UserMapper.mapToDomain).mockReturnValue(userEntity);
      const result = await service.loadUserById(userOrmEntity.id);
      expect(result).toEqual(userEntity);
    });
  });

  describe(`loadUserByEmail method`, () => {
    it(`should call findOne method of repository`, async () => {
      const findOne = jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userOrmEntity);
      await service.loadUserByEmail(userOrmEntity.email);
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of UserMapper`, async () => {
      jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
      await service.loadUserByEmail(userOrmEntity.email);
      expect(UserMapper.mapToDomain).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of UserMapper with params`, async () => {
      jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
      await service.loadUserByEmail(userOrmEntity.email);
      expect(UserMapper.mapToDomain).toHaveBeenCalledWith(userOrmEntity);
    });

    it(`should return result of mapToDomain method`, async () => {
      jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userOrmEntity);
      jest.fn(UserMapper.mapToDomain).mockReturnValue(userEntity);
      const result = await service.loadUserByEmail(userOrmEntity.email);
      expect(result).toEqual(userEntity);
    });
  });

  describe(`saveUser method`, () => {
    beforeAll(() => {

    });

    it(`should call mapToOrmEntity method of UserMapper`, async () => {
      UserMapper.mapToOrmEntity = jest.fn(UserMapper.mapToOrmEntity);
      jest.spyOn(repository, `create`).mockReturnValue(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
      await service.saveUser(userEntity);
      expect(UserMapper.mapToOrmEntity).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToOrmEntity method of UserMapper with params`, async () => {
      UserMapper.mapToOrmEntity = jest.fn(UserMapper.mapToOrmEntity);
      jest.spyOn(repository, `create`).mockReturnValue(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
      await service.saveUser(userEntity);
      expect(UserMapper.mapToOrmEntity).toHaveBeenCalledWith(userEntity);
    });

    it(`should call create method of repository`, async () => {
      UserMapper.mapToOrmEntity = jest.fn(UserMapper.mapToOrmEntity).mockReturnValue(userOrmEntity);
      const create = jest.spyOn(repository, `create`).mockReturnValue(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain).mockReturnValue(userEntity);
      await service.saveUser(userEntity);
      expect(create).toHaveBeenCalledTimes(1);
    });

    it(`should call create method of repository with params`, async () => {
      UserMapper.mapToOrmEntity = jest.fn(UserMapper.mapToOrmEntity).mockReturnValue(userOrmEntity);
      const create = jest.spyOn(repository, `create`).mockReturnValue(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain).mockReturnValue(userEntity);
      await service.saveUser(userEntity);
      expect(create).toHaveBeenCalledWith(userOrmEntity);
    });

    it(`should call mapToDomain method of UserMapper`, async () => {
      UserMapper.mapToOrmEntity = jest.fn(UserMapper.mapToOrmEntity).mockReturnValue(userOrmEntity);
      jest.spyOn(repository, `create`).mockReturnValue(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
      await service.saveUser(userEntity);
      expect(UserMapper.mapToDomain).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of UserMapper with params`, async () => {
      UserMapper.mapToOrmEntity = jest.fn(UserMapper.mapToOrmEntity).mockReturnValue(userOrmEntity);
      jest.spyOn(repository, `create`).mockReturnValue(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
      await service.saveUser(userEntity);
      expect(UserMapper.mapToDomain).toHaveBeenCalledWith(userOrmEntity);
    });

    it(`should return result of  mapToDomain method of UserMapper`, async () => {
      UserMapper.mapToOrmEntity = jest.fn(UserMapper.mapToOrmEntity).mockReturnValue(userOrmEntity);
      jest.spyOn(repository, `create`).mockReturnValue(userOrmEntity);
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain).mockReturnValue(userEntity);
      const result = await service.saveUser(userEntity);
      expect(result).toEqual(userEntity);
    });
  });
});
