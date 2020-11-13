import { HotelEntity, IHotel, ILocation } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';

import { HotelService } from './hotel.service';


const hotelParams: IHotel = {
  id: 1,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [
    {
      id: 1,
      title: `title`,
    },
    {
      id: 2,
      title: `title`,
    }
  ],
  type: {
    id: 1,
    title: `title`,
  },
  city: {
    id: 1,
    title: `title`,
    location: {
      id: 1,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: 1,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: 1,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: 1,
      title: `title`,
    },
    image: {
      id: 1,
      title: `title`,
    },
  },
  images: [
    {
      id: 1,
      title: `title`,
    },
    {
      id: 2,
      title: `title`,
    }
  ],
};

const hotelSortingParams: IHotelSortingParams = {
  cityId: 1,
};

const hotelLocations = [
  {
    id: 1,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  {
    id: 2,
    latitude: 52.366992,
    longitude: 4.898267,
    zoom: 10,
  },
  {
    id: 3,
    latitude: 52.363670,
    longitude: 4.899662,
    zoom: 10,
  },
  {
    id: 4,
    latitude: 52.363290,
    longitude: 4.899823,
    zoom: 10,
  },
  {
    id: 5,
    latitude: 52.362045,
    longitude: 4.901110,
    zoom: 10,
  },
  {
    id: 6,
    latitude: 52.357876,
    longitude: 4.903161,
    zoom: 10,
  },
  {
    id: 7,
    latitude: 52.370508,
    longitude: 4.894957,
    zoom: 10,
  },
  {
    id: 8,
    latitude: 52.370642,
    longitude: 4.894844,
    zoom: 10,
  }
];

describe(`Hotel Service`, () => {
  const hotelEntity = HotelEntity.create(hotelParams);

  describe(`getHotelList method`, () => {
    it(`should call loadHotelList method`, async () => {
      const loadHotelList = jest.fn();
      const hotelService = new HotelService(
        {loadHotelList},
        null
      );
      await hotelService.getHotelList(hotelSortingParams);
      expect(loadHotelList).toHaveBeenCalledTimes(1);
    });

    it(`should call loadHotelList method with sorting params`, async () => {
      const loadHotelList = jest.fn();
      const hotelService = new HotelService(
        {loadHotelList},
        null
      );
      await hotelService.getHotelList(hotelSortingParams);
      expect(loadHotelList).toHaveBeenCalledWith(hotelSortingParams);
    });

    it(`should return result of loadHotelList method`, async () => {
      const hotelEntityList = [hotelEntity];
      const hotelService = new HotelService(
        {loadHotelList: jest.fn().mockReturnValue(hotelEntityList)},
        null
      );
      const result = await hotelService.getHotelList(hotelSortingParams);
      expect(result).toEqual(hotelEntityList);
    });
  });

  describe(`getHotelById method`, () => {
    it(`should call loadHotelById method`, async () => {
      const loadHotelById = jest.fn();
      const hotelService = new HotelService(
        null,
        {loadHotelById}
      );
      await hotelService.getHotelById(hotelParams.id);
      expect(loadHotelById).toHaveBeenCalledTimes(1);
    });

    it(`should return result of loadHotelById method`, async () => {
      const hotelService = new HotelService(
        null,
        {loadHotelById: jest.fn().mockReturnValue(hotelEntity)}
      );
      const hotelResult = await hotelService.getHotelById(hotelParams.id);
      expect(hotelResult).toEqual(hotelEntity);
    });
  });

  describe(`getNearbyHotelList method`, () => {
    const hotelEntityList: HotelEntity[] = hotelLocations.map(
      (location: ILocation) => HotelEntity.create({...hotelParams, location})
    );

    it(`should call loadHotelById method`, async () => {
      const loadHotelById = jest.fn().mockReturnValue(hotelEntity);
      const hotelService = new HotelService(
        {loadHotelList: jest.fn().mockReturnValue(hotelEntityList)},
        {loadHotelById}
      );
      await hotelService.getNearbyHotelList(hotelParams.id);
      expect(loadHotelById).toHaveBeenCalledTimes(1);
    });

    it(`should call loadHotelById method with correct param`, async () => {
      const loadHotelById = jest.fn().mockReturnValue(hotelEntity);
      const hotelService = new HotelService(
        {loadHotelList: jest.fn().mockReturnValue(hotelEntityList)},
        {loadHotelById}
      );
      await hotelService.getNearbyHotelList(hotelParams.id);
      expect(loadHotelById).toHaveBeenCalledWith(hotelParams.id);
    });

    it(`should call loadHotelList method`, async () => {
      const loadHotelList = jest.fn().mockReturnValue(hotelEntityList);
      const hotelService = new HotelService(
        {loadHotelList},
        {loadHotelById: jest.fn().mockReturnValue(hotelEntity)}
      );
      await hotelService.getNearbyHotelList(hotelParams.id);
      expect(loadHotelList).toHaveBeenCalledTimes(1);
    });

    it(`should call getNearbyHotels method of hotelEntity instance`, async () => {
      hotelEntity.getNearbyHotelList = jest.fn(hotelEntity.getNearbyHotelList);
      const hotelService = new HotelService(
        {loadHotelList: jest.fn().mockReturnValue(hotelEntityList)},
        {loadHotelById: jest.fn().mockReturnValue(hotelEntity)}
      );
      await hotelService.getNearbyHotelList(hotelParams.id);
      expect(hotelEntity.getNearbyHotelList).toHaveBeenCalledTimes(1);
    });

    it(`should call getNearbyHotels method of hotelEntity instance with correct params`, async () => {
      hotelEntity.getNearbyHotelList = jest.fn(hotelEntity.getNearbyHotelList);
      const hotelService = new HotelService(
        {loadHotelList: jest.fn().mockReturnValue(hotelEntityList)},
        {loadHotelById: jest.fn().mockReturnValue(hotelEntity)}
      );
      await hotelService.getNearbyHotelList(hotelParams.id);
      expect(hotelEntity.getNearbyHotelList).toHaveBeenCalledWith(hotelEntityList);
    });

    it(`should return result of getNearbyHotels method`, async () => {
      const expectedHotelEntityList = hotelEntityList.slice(0, 3);
      hotelEntity.getNearbyHotelList = jest.fn(hotelEntity.getNearbyHotelList).mockReturnValue(expectedHotelEntityList);
      const hotelService = new HotelService(
        {loadHotelList: jest.fn().mockReturnValue(hotelEntityList)},
        {loadHotelById: jest.fn().mockReturnValue(hotelEntity)}
      );
      const nearbyHotels = await hotelService.getNearbyHotelList(hotelParams.id);
      expect(nearbyHotels).toEqual(expectedHotelEntityList);
    });
  });
});
