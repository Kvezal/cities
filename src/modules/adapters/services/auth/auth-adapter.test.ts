import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthAdapterService } from 'modules/adapters/services/auth/auth-adapter.service';
import { JsonWebTokenOrmEntity } from 'modules/adapters';

describe(`Auth Adapter Service`, () => {
  let service: AuthAdapterService;
  let repositoryService: Repository<JsonWebTokenOrmEntity>;
  const refreshToken = `refresh-token`;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAdapterService,
        {
          provide: getRepositoryToken(JsonWebTokenOrmEntity),
          useClass: Repository
        },
      ],
    }).compile();
    service = testModule.get<AuthAdapterService>(AuthAdapterService);
    repositoryService = testModule.get<Repository<JsonWebTokenOrmEntity>>(getRepositoryToken(JsonWebTokenOrmEntity));
  });

  describe(`checkExistedJsonWebToken method`, () => {
    const jsonWebTokenOrmEntity: JsonWebTokenOrmEntity = {
      id: 1,
      token: refreshToken,
      createdAt: new Date(),
    };

    describe(`findOne method of JsonWebTokenRepository`, () => {
      it(`should call`, async () => {
        const findOne = jest.spyOn(repositoryService, `findOne`).mockImplementation(() => null);
        await service.checkExistedJsonWebToken(refreshToken);
        expect(findOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findOne = jest.spyOn(repositoryService, `findOne`).mockImplementation(() => null);
        await service.checkExistedJsonWebToken(refreshToken);
        expect(findOne).toHaveBeenCalledWith({token: refreshToken});
      });
    });

    it(`should return "true" if token is found`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockImplementation(async () => jsonWebTokenOrmEntity);
      const result = await service.checkExistedJsonWebToken(refreshToken);
      expect(result).toBeTruthy();
    });

    it(`should return "false" if token isn't found`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockImplementation(async () => null);
      const result = await service.checkExistedJsonWebToken(refreshToken);
      expect(result).toBeFalsy();
    });
  });

  describe(`saveJsonWebToken method`, () => {
    const jsonWebTokenOrmEntity: JsonWebTokenOrmEntity = {
      token: refreshToken,
    };

    beforeEach(async () => {
      jest.spyOn(repositoryService, `create`).mockImplementationOnce(() => jsonWebTokenOrmEntity);
      jest.spyOn(repositoryService, `save`).mockImplementationOnce(() => null);
    });

    describe(`create method of JsonWebTokenRepository`, () => {
      it(`should call`, async () => {
        const create = jest.spyOn(repositoryService, `create`).mockImplementationOnce(() => null);
        await service.saveJsonWebToken(refreshToken);
        expect(create).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const create = jest.spyOn(repositoryService, `create`).mockImplementationOnce(() => jsonWebTokenOrmEntity);
        await service.saveJsonWebToken(refreshToken);
        expect(create).toHaveBeenCalledWith(jsonWebTokenOrmEntity);
      });
    });

    describe(`save method of JsonWebTokenRepository`, () => {
      it(`should call`, async () => {
        const save = jest.spyOn(repositoryService, `save`).mockImplementationOnce(() => null);
        await service.saveJsonWebToken(refreshToken);
        expect(save).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const save = jest.spyOn(repositoryService, `save`).mockImplementationOnce(() => null);
        await service.saveJsonWebToken(refreshToken);
        expect(save).toHaveBeenCalledWith(jsonWebTokenOrmEntity);
      });
    });
  });

  describe(`deleteJsonWebToken method`, () => {
    it(`should call create method of JsonWebTokenRepository`, async () => {
      const deleteToken = jest.spyOn(repositoryService, `delete`).mockImplementationOnce(() => null);
      await service.deleteJsonWebToken(refreshToken);
      expect(deleteToken).toHaveBeenCalledTimes(1);
    });

    it(`should call create method of JsonWebTokenRepository with params`, async () => {
      const deleteToken = jest.spyOn(repositoryService, `delete`).mockImplementationOnce(() => null);
      await service.deleteJsonWebToken(refreshToken);
      expect(deleteToken).toHaveBeenCalledWith({token: refreshToken});
    });
  });
});
