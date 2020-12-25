import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { AuthAdapterService } from 'modules/adapters/services/auth/auth-adapter.service';
import { RefreshTokensDbTable } from 'modules/db';


export interface IJsonWebTokenTableParams {
  id: string;
  value: string;
  created_at: string;
}

const jsonWebTokenTableParams: IJsonWebTokenTableParams = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  value: `refresh-token`,
  created_at: `2020-12-25T02:07:14.730Z`,
};


describe(`Auth Adapter Service`, () => {
  let service: AuthAdapterService;
  let refreshTokensDbTable: RefreshTokensDbTable;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAdapterService,
        RefreshTokensDbTable,
        {
          provide: RefreshTokensDbTable,
          useValue: {
            findOne: async () => null,
            createOne: async () => null,
            removeOne: async () => null,
          }
        },
      ],
    }).compile();
    service = testModule.get<AuthAdapterService>(AuthAdapterService);
    refreshTokensDbTable = testModule.get<RefreshTokensDbTable>(RefreshTokensDbTable);
  });

  describe(`checkExistedJsonWebToken method`, () => {

    describe(`findOne method of RefreshTokensDbTable`, () => {
      it(`should call`, async () => {
        const findOne = jest.spyOn(refreshTokensDbTable, `findOne`).mockImplementation(() => null);
        await service.checkExistedJsonWebToken(jsonWebTokenTableParams.value);
        expect(findOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findOne = jest.spyOn(refreshTokensDbTable, `findOne`).mockImplementation(() => null);
        await service.checkExistedJsonWebToken(jsonWebTokenTableParams.value);
        expect(findOne).toHaveBeenCalledWith({value: jsonWebTokenTableParams.value});
      });
    });

    it(`should return "true" if token is found`, async () => {
      jest.spyOn(refreshTokensDbTable, `findOne`).mockImplementation(async () => jsonWebTokenTableParams);
      const result = await service.checkExistedJsonWebToken(jsonWebTokenTableParams.value);
      expect(result).toBeTruthy();
    });

    it(`should return "false" if token isn't found`, async () => {
      jest.spyOn(refreshTokensDbTable, `findOne`).mockImplementation(async () => null);
      const result = await service.checkExistedJsonWebToken(jsonWebTokenTableParams.value);
      expect(result).toBeFalsy();
    });
  });

  describe(`saveJsonWebToken method`, () => {
    beforeEach(async () => {
      jest.spyOn(refreshTokensDbTable, `createOne`).mockImplementationOnce(async () => jsonWebTokenTableParams);
    });

    it(`should call create method of RefreshTokensDbTable`, async () => {
      const createOne = jest.spyOn(refreshTokensDbTable, `createOne`).mockImplementationOnce(async () => null);
      await service.saveJsonWebToken(jsonWebTokenTableParams.value);
      expect(createOne).toHaveBeenCalledTimes(1);
    });

    it(`should call create method of RefreshTokensDbTable with params`, async () => {
      const createOne = jest.spyOn(refreshTokensDbTable, `createOne`).mockImplementationOnce(async () => jsonWebTokenTableParams);
      await service.saveJsonWebToken(jsonWebTokenTableParams.value);
      expect(createOne).toHaveBeenCalledWith({
        value: jsonWebTokenTableParams.value
      });
    });
  });

  describe(`deleteJsonWebToken method`, () => {
    it(`should call create method of RefreshTokensDbTable`, async () => {
      const removeOne = jest.spyOn(refreshTokensDbTable, `removeOne`).mockImplementationOnce(async () => null);
      await service.deleteJsonWebToken(jsonWebTokenTableParams.value);
      expect(removeOne).toHaveBeenCalledTimes(1);
    });

    it(`should call create method of RefreshTokensDbTable with params`, async () => {
      const removeOne = jest.spyOn(refreshTokensDbTable, `removeOne`).mockImplementationOnce(async () => null);
      await service.deleteJsonWebToken(jsonWebTokenTableParams.value);
      expect(removeOne).toHaveBeenCalledWith({value: jsonWebTokenTableParams.value});
    });
  });
});
