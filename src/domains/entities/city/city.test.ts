import { LocationEntity } from 'domains/entities';

import { CityEntity } from './city.entity';
import { ICity } from './city-interface';


const cityParams: ICity = {
  id: 1,
  title: `title`,
  location: {
    id: 1,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

describe(`City entity`, () => {
  describe(`constructor`, () => {
    let city: CityEntity;

    beforeAll(() => {
      city = new CityEntity(
        cityParams.id,
        cityParams.title,
        LocationEntity.create(cityParams.location)
      );
    });

    it.each([`location`])(`should create a new City instance with %p property`, (property) => {
      expect(city).toHaveProperty(property);
    });

    it.each([`id`, `title`])(`should create a new City instance with correct %p property`, (property) => {
      expect(city[property]).toBe(cityParams[property]);
    });
  });

  describe(`create method`, () => {
    let city: CityEntity;

    beforeAll(() => {
      city = CityEntity.create(cityParams);
    });

    it.each([`location`])(`should create a new City instance with %p property`, (property) => {
      expect(city).toHaveProperty(property);
    });

    it.each([`id`, `title`])(`should create a new City instance with correct %p property`, (property) => {
      expect(city[property]).toBe(cityParams[property]);
    });
  });
});
