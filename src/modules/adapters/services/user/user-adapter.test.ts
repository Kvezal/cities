import { Test, TestingModule } from '@nestjs/testing';

import { IUser, UserEntity } from 'domains/entities';
import { UserMapper } from 'modules/adapters/mappers';

import { UserAdapterService } from './user-adapter.service';
import { UsersDbTable } from 'modules/db';
import { IUserTableParams } from 'modules/db/interfaces';


const userTableParams: IUserTableParams = {
  id: `e8c1ee3c-0070-4902-b840-7cf94ea3c049`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  type: {
    id: `fb847d59-7745-43ae-b7d5-c5fec95d1efc`,
    title: `title`,
  },
  image: {
    id: `db709632-439a-4c90-a151-044e28919754`,
    title: `title`,
  },
};

const userEntityParams: IUser = {
  id: userTableParams.id,
  name: userTableParams.name,
  email: userTableParams.email,
  password: userTableParams.password,
  type: {
    id: userTableParams.type.id,
    title: userTableParams.type.title,
  },
  image: {
    id: userTableParams.image.id,
    title: userTableParams.image.title,
  },
};

describe(`User Adapter Service`, () => {
  let service: UserAdapterService;
  let usersDbTable: UsersDbTable;
  const userEntity: UserEntity = UserEntity.create(userEntityParams);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserAdapterService,
        {
          provide: UsersDbTable,
          useValue: {
            findOne: async () => userTableParams,
            createOne: async () => userTableParams,
          },
        },
      ],
    }).compile();
    service = testModule.get<UserAdapterService>(UserAdapterService);
    usersDbTable = testModule.get<UsersDbTable>(UsersDbTable);
  });

  it(`should define service`, () => {
    expect(service).toBeDefined();
  });

  describe(`loadUserById method`, () => {
    describe(`findOne method of usersDbTable`, () => {
      it(`should call`, async () => {
        const findOne = jest.spyOn(usersDbTable, `findOne`);
        await service.loadUserById(userEntityParams.id);
        expect(findOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findOne = jest.spyOn(usersDbTable, `findOne`);
        await service.loadUserById(userEntityParams.id);
        expect(findOne).toHaveBeenCalledWith({
          id: userEntityParams.id,
        });
      });
    });

    describe(`mapToDomain method of UserMapper`, () => {
      it(`should call`, async () => {
        jest.spyOn(usersDbTable, `findOne`);
        UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
        await service.loadUserById(userEntityParams.id);
        expect(UserMapper.mapToDomain).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        jest.spyOn(usersDbTable, `findOne`);
        UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
        await service.loadUserById(userEntityParams.id);
        expect(UserMapper.mapToDomain).toHaveBeenCalledWith(userEntityParams);
      });
    });

    it(`should return result of mapToDomain method`, async () => {
      jest.spyOn(usersDbTable, `findOne`);
      jest.fn(UserMapper.mapToDomain).mockReturnValue(userEntity);
      const result = await service.loadUserById(userEntityParams.id);
      expect(result).toEqual(userEntity);
    });
  });

  describe(`loadUserByEmail method`, () => {
    describe(`findOne method of usersDbTable`, () => {
      it(`should call`, async () => {
        const findOne = jest.spyOn(usersDbTable, `findOne`);
        await service.loadUserByEmail(userEntityParams.email);
        expect(findOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findOne = jest.spyOn(usersDbTable, `findOne`);
        await service.loadUserByEmail(userEntityParams.email);
        expect(findOne).toHaveBeenCalledWith({
          email: userEntityParams.email,
        });
      });
    });

    describe(`mapToDomain method of UserMapper`, () => {
      it(`should call`, async () => {
        jest.spyOn(usersDbTable, `findOne`);
        UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
        await service.loadUserByEmail(userEntityParams.email);
        expect(UserMapper.mapToDomain).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        jest.spyOn(usersDbTable, `findOne`);
        UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
        await service.loadUserByEmail(userEntityParams.email);
        expect(UserMapper.mapToDomain).toHaveBeenCalledWith(userEntityParams);
      });
    });

    it(`should return result of mapToDomain method`, async () => {
      jest.spyOn(usersDbTable, `findOne`);
      jest.fn(UserMapper.mapToDomain).mockReturnValue(userEntity);
      const result = await service.loadUserByEmail(userEntityParams.email);
      expect(result).toEqual(userEntity);
    });
  });


  describe(`saveUser method`, () => {
    describe(`mapToTableParams method of UserMapper`, () => {
      it(`should call`, async () => {
        UserMapper.mapToTableParams = jest.fn(UserMapper.mapToTableParams);
        await service.saveUser(userEntity);
        expect(UserMapper.mapToTableParams).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        UserMapper.mapToTableParams = jest.fn(UserMapper.mapToTableParams);
        await service.saveUser(userEntity);
        expect(UserMapper.mapToTableParams).toHaveBeenCalledWith(userEntity);
      });
    });

    describe(`createOne method of usersDbTable`, () => {
      it(`should call`, async () => {
        const createOne = jest.spyOn(usersDbTable, `createOne`);
        await service.saveUser(userEntity);
        expect(createOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const createOne = jest.spyOn(usersDbTable, `createOne`);
        await service.saveUser(userEntity);
        expect(createOne).toHaveBeenCalledWith(userTableParams);
      });
    });

    describe(`mapToDomain method of UserMapper`, () => {
      it(`should call`, async () => {
        UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
        await service.saveUser(userEntity);
        expect(UserMapper.mapToDomain).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain);
        await service.saveUser(userEntity);
        expect(UserMapper.mapToDomain).toHaveBeenCalledWith(userTableParams);
      });
    });

    it(`should return result of  mapToDomain method of UserMapper`, async () => {
      UserMapper.mapToDomain = jest.fn(UserMapper.mapToDomain).mockReturnValue(userEntity);
      const result = await service.saveUser(userEntity);
      expect(result).toBe(userEntity);
    });
  });
});
