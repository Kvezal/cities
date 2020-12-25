import { Test, TestingModule } from '@nestjs/testing';

import { IUserType, UserTypeEntity } from 'domains/entities';
import { UserTypesDbTable } from 'modules/db';
import { IUserTypeTableParams } from 'modules/db/interfaces';

import { UserTypeMapper } from '../../mappers';
import { UserTypeAdapterService } from './user-type-adapter.service';


const userTableParams: IUserTypeTableParams = {
  id: `1`,
  title: `title`,
};

const userEntityParams: IUserType = {
  id: userTableParams.id,
  title: userTableParams.title,
};

describe(`User Type Adapter Service`, () => {
  let service: UserTypeAdapterService;
  let userTypesDbTable: UserTypesDbTable;
  const userTypeEntity: UserTypeEntity = UserTypeEntity.create(userEntityParams);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserTypeAdapterService,
        {
          provide: UserTypesDbTable,
          useValue: {
            findOne: async () => userTableParams,
          },
        },
      ],
    }).compile();
    service = testModule.get<UserTypeAdapterService>(UserTypeAdapterService);
    userTypesDbTable = testModule.get<UserTypesDbTable>(UserTypesDbTable);
  });

  it(`should define service`, () => {
    expect(service).toBeDefined();
  });

  describe(`loadUserTypeByTitle method`, () => {
    describe(`findOne method of UserTypesDbTable`, () => {
      it(`should call`, async () => {
        const findOne = jest.spyOn(userTypesDbTable, `findOne`);
        await service.loadUserTypeByTitle(userTableParams.title);
        expect(findOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findOne = jest.spyOn(userTypesDbTable, `findOne`);
        await service.loadUserTypeByTitle(userTableParams.title);
        expect(findOne).toHaveBeenCalledWith({
          title: userTableParams.title,
        });
      });
    });

    describe(`mapToDomain method of UserTypeMapper`, () => {
      it(`should call`, async () => {
        UserTypeMapper.mapToDomain = jest.fn(UserTypeMapper.mapToDomain);
        await service.loadUserTypeByTitle(userTableParams.title);
        expect(UserTypeMapper.mapToDomain).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        UserTypeMapper.mapToDomain = jest.fn(UserTypeMapper.mapToDomain);
        await service.loadUserTypeByTitle(userTableParams.title);
        expect(UserTypeMapper.mapToDomain).toHaveBeenCalledWith(userTableParams);
      });
    });

    it(`should return correct result`, async () => {
      UserTypeMapper.mapToDomain = jest.fn(UserTypeMapper.mapToDomain).mockReturnValue(userTypeEntity);
      const result = await service.loadUserTypeByTitle(userTableParams.title);
      expect(result).toEqual(userTypeEntity);
    });
  });
});
