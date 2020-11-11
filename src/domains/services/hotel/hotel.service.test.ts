import { HotelService } from './hotel.service';
import { HotelEntity, IHotel } from '../../entities/hotel';


describe(`Hotel Service`, () => {
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

  describe(`getHotelList method`, () => {
    it(`should call loadHotelList method`, () => {
      const loadHotelListMock = jest.fn();
      const hotelService = new HotelService(
        {loadHotelList: loadHotelListMock}
      );
      hotelService.getHotelList();
      expect(loadHotelListMock.mock.calls).toHaveLength(1);
    });

    it(`should return result of loadHotelList method`, () => {
      const hotelEntity = HotelEntity.create(hotelParams);
      const loadHotelListMock = jest.fn().mockReturnValue(hotelEntity);
      const hotelService = new HotelService(
        {loadHotelList: loadHotelListMock}
      );
      const result = hotelService.getHotelList();
      expect(result).toEqual(hotelEntity);
    });
  });
});
