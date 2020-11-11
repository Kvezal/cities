import { LocationEntity } from './location.entity';
import { ILocation } from './location.interface';


const locationParams: ILocation = {
  id: 1,
  latitude: 52.370216,
  longitude: 4.895168,
  zoom: 10,
};

describe(`Feature entity`, () => {
  describe(`constructor`, () => {
    let location: LocationEntity = null;

    beforeAll(() => {
      location = new LocationEntity(
        locationParams.id,
        locationParams.latitude,
        locationParams.longitude,
        locationParams.zoom
      );
    });

    it.each(
      [`id`, `latitude`, `longitude`, `zoom`]
    )(`should create a new Feature instance with correct %p property`, (property) => {
      expect(location[property]).toBe(locationParams[property]);
    });
  });

  describe(`create method`, () => {
    let location: LocationEntity = null;

    beforeAll(() => {
      location = LocationEntity.create(locationParams);
    });

    it(`should create a new Feature instance`, () => {
      expect(location).toBeInstanceOf(LocationEntity);
    });

    it.each(
      [`id`, `latitude`, `longitude`, `zoom`]
    )(`should create a new Feature instance with correct %p property`, (property) => {
      expect(location[property]).toBe(locationParams[property]);
    });
  })
});
