import { CityEntity, ICity } from 'domains/entities';

import { CityService } from './city.service';


const cityParams: ICity = {
  id: `1`,
  title: `title`,
  location: {
    id: `1`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

describe(`City Service`, () => {
  const city = CityEntity.create(cityParams);

  describe(`getCityList`, () => {
    it(`should call loadCityList method`, async () => {
      const loadCityList = jest.fn();
      const cityService = new CityService(
        {loadCityList},
        null
      );
      await cityService.getCityList();
      expect(loadCityList).toHaveBeenCalledTimes(1);
    });

    it(`should return result of loadCityList method`, async () => {
      const cityList = [city];
      const loadCityList = jest.fn().mockReturnValue(cityList);
      const cityService = new CityService(
        {loadCityList},
        null
      );
      const result = await cityService.getCityList();
      expect(result).toEqual(cityList);
    });
  });

  describe(`getCityById`, () => {
    it(`should call loadCityById method`, async () => {
      const loadCityById = jest.fn();
      const cityService = new CityService(
        null,
        {loadCityById}
      );
      await cityService.getCityById(cityParams.id);
      expect(loadCityById).toHaveBeenCalledTimes(1);
    });

    it(`should return result of loadCityById method`, async () => {
      const cityList = [city];
      const loadCityById = jest.fn().mockReturnValue(cityList);
      const cityService = new CityService(
        null,
        {loadCityById}
      );
      const result = await cityService.getCityById(cityParams.id);
      expect(result).toEqual(cityList);
    });
  });
});
