import { LocationEntity } from './location.entity';
import { ILocation } from './location.interface';


const locationParams: ILocation = {
  id: 1,
  latitude: 0.000012,
  longitude: 0.000013,
  zoom: 10,
};

const otherLocationParams: ILocation = {
  id: 1,
  latitude: 0.000009,
  longitude: 0.000009,
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
  });

  describe(`calculateDistance method`, () => {
    const location: LocationEntity = LocationEntity.create(locationParams);
    const otherLocation: LocationEntity = LocationEntity.create(otherLocationParams);

    it(`should calculate distance`, () => {
      const distance = location.calculateDistance(otherLocation);
      expect(distance).toBe(0.000005);
    });
  })
});
