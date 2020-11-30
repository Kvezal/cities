import { Connection } from 'typeorm';

import {
  CityOrmEntity,
  CommentOrmEntity,
  FavoriteOrmEntity,
  FeatureOrmEntity,
  HotelOrmEntity,
  HotelTypeOrmEntity,
  ImageOrmEntity,
  LocationOrmEntity,
  RatingOrmEntity,
  UserOrmEntity,
  UserTypeOrmEntity,
} from '../../../../modules/adapters/orm-entities';
import { createTestingConnection } from '../utils/create-testing-connection';
import { DatabaseFiller } from './database-filler';
import { IDatabaseFillerParams } from './database-filler.interface';


const databaseFillerParams: IDatabaseFillerParams = {
  cities: [{
    name: `Dusseldorf`,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
    from: {
      latitude: 51.223151,
      longitude: 6.770853,
    },
    to: {
      latitude: 51.228298,
      longitude: 6.782322,
    }
  }],
  hotels: {
    titles: [`title`],
    descriptions: [`description`],
    images: [`hotel image url`],
    types: [`hotel type`],
    features: [`feature`],
  },
  users: {
    types: [`user type`],
    images: [`user image url`],
  },
};

describe(`Database filler`, () => {
  describe(`fill method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
      databaseFiller.fillCitiesTable = () => null;
      databaseFiller.fillUserTypesTable = () => null;
      databaseFiller.fillHotelTypesTable = () => null;
      databaseFiller.fillFeaturesTable = () => null;
      databaseFiller.fillUsersTable = () => null;
      databaseFiller.fillHotelsTable = () => null;
      databaseFiller.fillRatingsTable = () => null;
      databaseFiller.fillFavoritesTable = () => null;
      databaseFiller.fillCommentsTable = () => null;
    });

    it(`should call fillCitiesTable method`, async () => {
      databaseFiller.fillCitiesTable = jest.fn(databaseFiller.fillCitiesTable);
      await databaseFiller.fill(0);
      expect(databaseFiller.fillCitiesTable).toHaveBeenCalledTimes(1);
    });

    it(`should call fillUserTypesTable method`, async () => {
      databaseFiller.fillUserTypesTable = jest.fn(databaseFiller.fillUserTypesTable);
      await databaseFiller.fill(0);
      expect(databaseFiller.fillUserTypesTable).toHaveBeenCalledTimes(1);
    });

    it(`should call fillHotelTypesTable method`, async () => {
      databaseFiller.fillHotelTypesTable = jest.fn(databaseFiller.fillHotelTypesTable);
      await databaseFiller.fill(0);
      expect(databaseFiller.fillHotelTypesTable).toHaveBeenCalledTimes(1);
    });

    it(`should call fillFeaturesTable method`, async () => {
      databaseFiller.fillFeaturesTable = jest.fn(databaseFiller.fillFeaturesTable);
      await databaseFiller.fill(0);
      expect(databaseFiller.fillFeaturesTable).toHaveBeenCalledTimes(1);
    });

    it(`shouldn't call fillUsersTable method with record count equal "0"`, async () => {
      databaseFiller.fillUsersTable = jest.fn(databaseFiller.fillUsersTable);
      await databaseFiller.fill(0);
      expect(databaseFiller.fillUsersTable).toHaveBeenCalledTimes(0);
    });

    it(`should call fillUsersTable method with record count greater then "0"`, async () => {
      databaseFiller.fillUsersTable = jest.fn(databaseFiller.fillUsersTable);
      await databaseFiller.fill(1);
      expect(databaseFiller.fillUsersTable).toHaveBeenCalledTimes(1);
    });

    it(`should call fillUsersTable method with param`, async () => {
      const recordCount = 10;
      databaseFiller.fillUsersTable = jest.fn(databaseFiller.fillUsersTable);
      await databaseFiller.fill(recordCount);
      expect(databaseFiller.fillUsersTable).toHaveBeenCalledWith(recordCount);
    });

    it(`shouldn't call fillHotelsTable method with record count equal "0"`, async () => {
      databaseFiller.fillHotelsTable = jest.fn(databaseFiller.fillHotelsTable);
      await databaseFiller.fill(0);
      expect(databaseFiller.fillHotelsTable).toHaveBeenCalledTimes(0);
    });

    it(`should call fillHotelsTable method with record count greater then "0"`, async () => {
      databaseFiller.fillHotelsTable = jest.fn(databaseFiller.fillHotelsTable);
      await databaseFiller.fill(1);
      expect(databaseFiller.fillHotelsTable).toHaveBeenCalledTimes(1);
    });

    it(`should call fillHotelsTable method with param`, async () => {
      const recordCount = 10;
      databaseFiller.fillHotelsTable = jest.fn(databaseFiller.fillHotelsTable);
      await databaseFiller.fill(recordCount);
      expect(databaseFiller.fillHotelsTable).toHaveBeenCalledWith(recordCount);
    });

    it(`shouldn't call fillRatingsTable method with record count equal "0"`, async () => {
      databaseFiller.fillRatingsTable = jest.fn(databaseFiller.fillRatingsTable);
      await databaseFiller.fill(0);
      expect(databaseFiller.fillRatingsTable).toHaveBeenCalledTimes(0);
    });

    it(`should call fillRatingsTable method with record count greater then "0"`, async () => {
      databaseFiller.fillRatingsTable = jest.fn(databaseFiller.fillRatingsTable);
      await databaseFiller.fill(1);
      expect(databaseFiller.fillRatingsTable).toHaveBeenCalledTimes(1);
    });

    it(`shouldn't call fillFavoritesTable method with record count equal "0"`, async () => {
      databaseFiller.fillFavoritesTable = jest.fn(databaseFiller.fillFavoritesTable);
      await databaseFiller.fill(0);
      expect(databaseFiller.fillFavoritesTable).toHaveBeenCalledTimes(0);
    });

    it(`should call fillFavoritesTable method with record count greater then "0"`, async () => {
      databaseFiller.fillFavoritesTable = jest.fn(databaseFiller.fillFavoritesTable);
      await databaseFiller.fill(1);
      expect(databaseFiller.fillFavoritesTable).toHaveBeenCalledTimes(1);
    });

    it(`shouldn't call fillCommentsTable method with record count equal "0"`, async () => {
      databaseFiller.fillCommentsTable = jest.fn(databaseFiller.fillCommentsTable);
      await databaseFiller.fill(0);
      expect(databaseFiller.fillCommentsTable).toHaveBeenCalledTimes(0);
    });

    it(`should call fillCommentsTable method with record count greater then "0"`, async () => {
      databaseFiller.fillCommentsTable = jest.fn(databaseFiller.fillCommentsTable);
      await databaseFiller.fill(1);
      expect(databaseFiller.fillCommentsTable).toHaveBeenCalledTimes(1);
    });
  });

  describe(`save method`, () => {
    let connection: Connection;
    let databaseFiller: DatabaseFiller;


    beforeEach(async () => {
      connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
    });

    it('should call getRepository method of connection instance', async () => {
      connection.getRepository = jest.fn().mockReturnValue({
        create: () => null,
        save: () => null,
      });
      await databaseFiller.save(UserOrmEntity, []);
      expect(connection.getRepository).toHaveBeenCalledTimes(1);
    });

    it('should call create method of repository instance', async () => {
      const create = jest.fn();
      connection.getRepository = jest.fn().mockReturnValue({
        create,
        save: () => null,
      });
      await databaseFiller.save(UserOrmEntity, []);
      expect(create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of repository instance with param', async () => {
      const createMethodParams = [`test`];
      const create = jest.fn();
      connection.getRepository = jest.fn().mockReturnValue({
        create,
        save: () => null,
      });
      await databaseFiller.save(UserOrmEntity, createMethodParams);
      expect(create).toHaveBeenCalledWith(createMethodParams);
    });

    it('should call save method of repository instance', async () => {
      const save = jest.fn();
      connection.getRepository = jest.fn().mockReturnValue({
        create: () => null,
        save,
      });
      await databaseFiller.save(UserOrmEntity, []);

      expect(save).toHaveBeenCalledTimes(1);
    });

    it('should call save method of repository instance with param', async () => {
      const saveMethodParams = [`test`];
      const save = jest.fn();
      connection.getRepository = jest.fn().mockReturnValue({
        create: () => saveMethodParams,
        save,
      });
      await databaseFiller.save(UserOrmEntity, []);
      expect(save).toHaveBeenCalledWith(saveMethodParams);
    });

    it('should return result of save method of repository instance', async () => {
      const saveMethodParams = [`test`];
      connection.getRepository = jest.fn().mockReturnValue({
        create: () => null,
        save: () => saveMethodParams,
      });
      const result = await databaseFiller.save(UserOrmEntity, []);
      expect(result).toBe(saveMethodParams);
    });
  });

  describe(`fillCitiesTable method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
    });

    it(`should call save method`, async () => {
      databaseFiller.save = jest.fn();
      await databaseFiller.fillCitiesTable();
      expect(databaseFiller.save).toHaveBeenCalledTimes(2);
    });

    it(`should call save method with correct entities`, async () => {
      const save = jest.fn();
      databaseFiller.save = save;
      await databaseFiller.fillCitiesTable();
      expect(save.mock.calls[0][0]).toBe(LocationOrmEntity);
      expect(save.mock.calls[1][0]).toBe(CityOrmEntity);
    });
  });

  describe(`fillUserTypesTable method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
    });

    it(`should call save method`, async () => {
      databaseFiller.save = jest.fn();
      await databaseFiller.fillUserTypesTable();
      expect(databaseFiller.save).toHaveBeenCalledTimes(1);
    });

    it(`should call save method with correct entities`, async () => {
      const save = jest.fn();
      databaseFiller.save = save;
      await databaseFiller.fillUserTypesTable();
      expect(save.mock.calls[0][0]).toBe(UserTypeOrmEntity);
    });
  });

  describe(`fillHotelTypesTable method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
    });

    it(`should call save method`, async () => {
      databaseFiller.save = jest.fn();
      await databaseFiller.fillHotelTypesTable();
      expect(databaseFiller.save).toHaveBeenCalledTimes(1);
    });

    it(`should call save method with correct entities`, async () => {
      const save = jest.fn();
      databaseFiller.save = save;
      await databaseFiller.fillHotelTypesTable();
      expect(save.mock.calls[0][0]).toBe(HotelTypeOrmEntity);
    });
  });

  describe(`fillFeaturesTable method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
    });

    it(`should call save method`, async () => {
      databaseFiller.save = jest.fn();
      await databaseFiller.fillFeaturesTable();
      expect(databaseFiller.save).toHaveBeenCalledTimes(1);
    });

    it(`should call save method with correct entities`, async () => {
      const save = jest.fn();
      databaseFiller.save = save;
      await databaseFiller.fillFeaturesTable();
      expect(save.mock.calls[0][0]).toBe(FeatureOrmEntity);
    });
  });

  describe(`fillUsersTable method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
      databaseFiller.fillCitiesTable = async () => null;
      databaseFiller.fillUserTypesTable = async () => [];
      databaseFiller.fillHotelTypesTable = async () => null;
      databaseFiller.fillFeaturesTable = async () => null;
    });

    it(`should call save method`, async () => {
      databaseFiller.save = jest.fn();
      await databaseFiller.fill(0);
      await databaseFiller.fillUsersTable(5);
      expect(databaseFiller.save).toHaveBeenCalledTimes(2);
    });

    it(`should call save method with correct entities`, async () => {
      const save = jest.fn();
      databaseFiller.save = save;
      await databaseFiller.fill(0);
      await databaseFiller.fillUsersTable(5);
      expect(save.mock.calls[0][0]).toBe(ImageOrmEntity);
      expect(save.mock.calls[1][0]).toBe(UserOrmEntity);
    });
  });

  describe(`fillHotelsTable method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
      databaseFiller.fillCitiesTable = jest.fn().mockResolvedValueOnce([{
        title: databaseFillerParams.cities[0].name,
        location: databaseFillerParams.cities[0].location,
      }]);
      databaseFiller.fillUserTypesTable = async () => null;
      databaseFiller.fillHotelTypesTable = async () => [];
      databaseFiller.fillFeaturesTable = async () => [];
      databaseFiller.fillUsersTable = async () => [];
      databaseFiller.fillRatingsTable = () => null;
      databaseFiller.save = () => null;
    });

    it(`should call save method`, async () => {
      const save = jest.fn();
      await databaseFiller.fill(1);
      databaseFiller.save = save;
      await databaseFiller.fillHotelsTable(5);
      expect(save).toHaveBeenCalledTimes(3);
    });

    it(`should call save method with correct entities`, async () => {
      await databaseFiller.fill(1);
      const save = jest.fn();
      databaseFiller.save = save;
      await databaseFiller.fillHotelsTable(5);
      expect(save.mock.calls[0][0]).toBe(LocationOrmEntity);
      expect(save.mock.calls[1][0]).toBe(ImageOrmEntity);
      expect(save.mock.calls[2][0]).toBe(HotelOrmEntity);
    });
  });

  describe(`fillRatingsTable method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
      databaseFiller.fillCitiesTable = jest.fn().mockResolvedValueOnce([{
        title: databaseFillerParams.cities[0].name,
        location: databaseFillerParams.cities[0].location,
      }]);
      databaseFiller.fillUserTypesTable = async () => null;
      databaseFiller.fillHotelTypesTable = async () => [];
      databaseFiller.fillFeaturesTable = async () => [];
      databaseFiller.fillUsersTable = async () => [];
      databaseFiller.fillHotelsTable = async () => [];
      databaseFiller.save = () => null;
    });

    it(`should call save method`, async () => {
      const save = jest.fn();
      await databaseFiller.fill(1);
      databaseFiller.save = save;
      await databaseFiller.fillRatingsTable();
      expect(save).toHaveBeenCalledTimes(1);
    });

    it(`should call save method with correct entities`, async () => {
      await databaseFiller.fill(1);
      const save = jest.fn();
      databaseFiller.save = save;
      await databaseFiller.fillRatingsTable();
      expect(save.mock.calls[0][0]).toBe(RatingOrmEntity);
    });
  });

  describe(`fillFavoritesTable method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
      databaseFiller.fillCitiesTable = jest.fn().mockResolvedValueOnce([{
        title: databaseFillerParams.cities[0].name,
        location: databaseFillerParams.cities[0].location,
      }]);
      databaseFiller.fillUserTypesTable = async () => null;
      databaseFiller.fillHotelTypesTable = async () => [];
      databaseFiller.fillFeaturesTable = async () => [];
      databaseFiller.fillUsersTable = async () => [];
      databaseFiller.fillHotelsTable = async () => [];
      databaseFiller.save = () => null;
    });

    it(`should call save method`, async () => {
      const save = jest.fn();
      await databaseFiller.fill(1);
      databaseFiller.save = save;
      await databaseFiller.fillFavoritesTable();
      expect(save).toHaveBeenCalledTimes(1);
    });

    it(`should call save method with correct entities`, async () => {
      await databaseFiller.fill(1);
      const save = jest.fn();
      databaseFiller.save = save;
      await databaseFiller.fillFavoritesTable();
      expect(save.mock.calls[0][0]).toBe(FavoriteOrmEntity);
    });
  });

  describe(`fillCommentsTable method`, () => {
    let databaseFiller: DatabaseFiller;

    beforeEach(async () => {
      const connection: Connection = await createTestingConnection();
      databaseFiller = new DatabaseFiller(connection, databaseFillerParams);
      databaseFiller.fillCitiesTable = jest.fn().mockResolvedValueOnce([{
        title: databaseFillerParams.cities[0].name,
        location: databaseFillerParams.cities[0].location,
      }]);
      databaseFiller.fillUserTypesTable = async () => null;
      databaseFiller.fillHotelTypesTable = async () => [];
      databaseFiller.fillFeaturesTable = async () => [];
      databaseFiller.fillUsersTable = async () => [];
      databaseFiller.fillHotelsTable = async () => [];
      databaseFiller.save = () => null;
    });

    it(`should call save method`, async () => {
      const save = jest.fn();
      await databaseFiller.fill(1);
      databaseFiller.save = save;
      await databaseFiller.fillCommentsTable();
      expect(save).toHaveBeenCalledTimes(1);
    });

    it(`should call save method with correct entities`, async () => {
      await databaseFiller.fill(1);
      const save = jest.fn();
      databaseFiller.save = save;
      await databaseFiller.fillCommentsTable();
      expect(save.mock.calls[0][0]).toBe(CommentOrmEntity);
    });
  });
});
