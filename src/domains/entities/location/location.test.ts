import { Location } from './location';
import { ILocation } from './location.interface';


const locationParams: ILocation = {
  id: 1,
  latitude: 52.370216,
  longitude: 4.895168,
  zoom: 10,
};

describe(`Feature entity`, () => {
  describe(`constructor`, () => {
    let location: Location = null;

    beforeAll(() => {
      location = new Location(
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
    let location: Location = null;

    beforeAll(() => {
      location = Location.create(locationParams);
    });

    it(`should create a new Feature instance`, () => {
      expect(location).toBeInstanceOf(Location);
    });

    it.each(
      [`id`, `latitude`, `longitude`, `zoom`]
    )(`should create a new Feature instance with correct %p property`, (property) => {
      expect(location[property]).toBe(locationParams[property]);
    });
  })
});
