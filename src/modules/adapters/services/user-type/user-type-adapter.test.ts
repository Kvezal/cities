import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserType, UserTypeEntity } from 'domains/entities';

import { UserTypeMapper } from '../../mappers';
import { UserTypeOrmEntity } from '../../orm-entities';
import { UserTypeAdapterService } from './user-type-adapter.service';


const userTypeOrmEntity: IUserType = {
  id: `1`,
  title: `title`,
};

describe(`User Type Adapter Service`, () => {
  let service: UserTypeAdapterService;
  let repository: Repository<UserTypeOrmEntity>;
  const userTypeEntity: UserTypeEntity = UserTypeEntity.create(userTypeOrmEntity);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserTypeAdapterService,
        {
          provide: getRepositoryToken(UserTypeOrmEntity),
          useClass: Repository,
        },
      ],
    }).compile();
    service = testModule.get<UserTypeAdapterService>(UserTypeAdapterService);
    repository = testModule.get<Repository<UserTypeOrmEntity>>(getRepositoryToken(UserTypeOrmEntity));
  });

  it(`should define service`, () => {
    expect(service).toBeDefined();
  });

  describe(`loadUserTypeByTitle method`, () => {
    beforeEach(async () => {
      jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userTypeOrmEntity);
    });

    describe(`findOne method of UserTypeOrmEntity repository`, () => {
      it(`should call`, async () => {
        const findOne = jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userTypeOrmEntity);
        await service.loadUserTypeByTitle(userTypeOrmEntity.title);
        expect(findOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findOne = jest.spyOn(repository, `findOne`).mockResolvedValueOnce(userTypeOrmEntity);
        await service.loadUserTypeByTitle(userTypeOrmEntity.title);
        expect(findOne).toHaveBeenCalledWith({
          where: {
            title: userTypeOrmEntity.title,
          },
        });
      });
    });

    describe(`mapToDomain method of UserTypeMapper`, () => {
      it(`should call`, async () => {
        UserTypeMapper.mapToDomain = jest.fn(UserTypeMapper.mapToDomain);
        await service.loadUserTypeByTitle(userTypeOrmEntity.title);
        expect(UserTypeMapper.mapToDomain).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        UserTypeMapper.mapToDomain = jest.fn(UserTypeMapper.mapToDomain);
        await service.loadUserTypeByTitle(userTypeOrmEntity.title);
        expect(UserTypeMapper.mapToDomain).toHaveBeenCalledWith(userTypeOrmEntity);
      });
    });

    it(`should return correct result`, async () => {
      UserTypeMapper.mapToDomain = jest.fn(UserTypeMapper.mapToDomain).mockReturnValue(userTypeEntity);
      const result = await service.loadUserTypeByTitle(userTypeOrmEntity.title);
      expect(result).toEqual(userTypeEntity);
    });
  });
});
