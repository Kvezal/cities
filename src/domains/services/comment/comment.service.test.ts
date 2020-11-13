import { CommentEntity, HotelEntity, IComment, IHotel, UserEntity } from '../../entities';
import { CommentService } from './comment.service';
import { ICommentSorting, IHotelCommentParams } from '../../interfaces';


const commentParams: IComment = {
  id: 1,
  text: `text`,
  date: new Date(),
  rating: 4,
  hotel: {
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
        id: 1,
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
  },
  user: {
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
};

const hotelCommentParams: IHotelCommentParams = {
  id: commentParams.id,
  text: commentParams.text,
  date: commentParams.date,
  rating: commentParams.rating,
  hotelId: commentParams.hotel.id,
  userId: commentParams.user.id,
};

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

const commentSortingParams: ICommentSorting = {
  hotelId: hotelParams.id,
};

describe(`Comment Service`, () => {
  describe(`getHotelCommentList method`, () => {
    it(`should call loadHotelCommentList method`, async () => {
      const loadHotelCommentList = jest.fn();
      const commentService = new CommentService(
        {loadHotelCommentList},
        null,
        null,
        null
      );
      await commentService.getHotelCommentList(commentSortingParams);
      expect(loadHotelCommentList).toHaveBeenCalledTimes(1);
    });

    it(`should call loadHotelCommentList method with correct params`, async () => {
      const loadHotelCommentList = jest.fn();
      const commentService = new CommentService(
        {loadHotelCommentList},
        null,
        null,
        null
      );
      await commentService.getHotelCommentList(commentSortingParams);
      expect(loadHotelCommentList).toHaveBeenCalledWith(commentSortingParams);
    });

    it(`should return result of loadHotelCommentList method`, async () => {
      const hotelEntity = HotelEntity.create(hotelParams);
      const loadHotelCommentList = jest.fn().mockReturnValue([hotelEntity]);
      const commentService = new CommentService(
        {loadHotelCommentList},
        null,
        null,
        null
      );
      const hotelCommentList = await commentService.getHotelCommentList(commentSortingParams);
      expect(hotelCommentList).toEqual([hotelEntity]);
    });
  });

  describe(`createHotelComment`, () => {
    it(`should call loadUserById method`, async () => {
      const loadUserById = jest.fn();
      const commentService = new CommentService(
        null,
        null,
        {loadUserById},
        null
      );
      await commentService.createHotelComment(hotelCommentParams);
      expect(loadUserById).toHaveBeenCalledTimes(1);
    });

    it(`should call loadUserById method with "userId" param`, async () => {
      const loadUserById = jest.fn();
      const commentService = new CommentService(
        null,
        null,
        {loadUserById},
        null
      );
      await commentService.createHotelComment(hotelCommentParams);
      expect(loadUserById).toHaveBeenCalledWith(hotelCommentParams.hotelId);
    });

    it(`should call loadHotelById method`, async () => {
      const loadHotelById = jest.fn();
      const commentService = new CommentService(
        null,
        null,
        {loadUserById: jest.fn().mockReturnValue(UserEntity.create(commentParams.user))},
        {loadHotelById}
      );
      await commentService.createHotelComment(hotelCommentParams);
      expect(loadHotelById).toHaveBeenCalledTimes(1);
    });

    it(`should call loadHotelById method with "hotelId" param`, async () => {
      const loadHotelById = jest.fn();
      const commentService = new CommentService(
        null,
        null,
        {loadUserById: jest.fn().mockReturnValue(UserEntity.create(commentParams.user))},
        {loadHotelById}
      );
      await commentService.createHotelComment(hotelCommentParams);
      expect(loadHotelById).toHaveBeenCalledWith(hotelCommentParams.hotelId);
    });

    it(`should call CommentEntity.create method`, async () => {
      CommentEntity.create = jest.fn(CommentEntity.create);
      const commentService = new CommentService(
        null,
        {saveHotelComment: () => null},
        {loadUserById: jest.fn().mockReturnValue(UserEntity.create(commentParams.user))},
        {loadHotelById: jest.fn().mockReturnValue(HotelEntity.create(commentParams.hotel))}
      );
      await commentService.createHotelComment(hotelCommentParams);
      expect(CommentEntity.create).toHaveBeenCalledTimes(1);
    });

    it(`should call CommentEntity.create method with params`, async () => {
      const userEntity = UserEntity.create(commentParams.user);
      const hotelEntity = HotelEntity.create(commentParams.hotel);
      CommentEntity.create = jest
        .fn(CommentEntity.create);
      const commentService = new CommentService(
        null,
        {saveHotelComment: () => null},
        {loadUserById: jest.fn().mockReturnValue(userEntity)},
        {loadHotelById: jest.fn().mockReturnValue(hotelEntity)}
      );
      await commentService.createHotelComment(hotelCommentParams);

      const params: IComment = {
        id: commentParams.id,
        text: commentParams.text,
        date: commentParams.date,
        rating: commentParams.rating,
        hotel: hotelEntity,
        user: userEntity,
      };
      expect(CommentEntity.create).toHaveBeenCalledWith(params);
    });

    it(`should call saveHotelComment method`, async () => {
      const saveHotelComment = jest.fn();
      const commentService = new CommentService(
        null,
        {saveHotelComment},
        {loadUserById: jest.fn().mockReturnValue(UserEntity.create(commentParams.user))},
        {loadHotelById: jest.fn().mockReturnValue(HotelEntity.create(commentParams.hotel))}
      );
      await commentService.createHotelComment(hotelCommentParams);
      expect(saveHotelComment).toHaveBeenCalledTimes(1);
    });

    it(`should call saveHotelComment method with params`, async () => {
      const commentEntity = CommentEntity.create(commentParams);
      const saveHotelComment = jest.fn().mockReturnValue(commentEntity);
      const commentService = new CommentService(
        null,
        {saveHotelComment},
        {loadUserById: jest.fn().mockReturnValue(UserEntity.create(commentParams.user))},
        {loadHotelById: jest.fn().mockReturnValue(HotelEntity.create(commentParams.hotel))}
      );
      await commentService.createHotelComment(hotelCommentParams);
      expect(saveHotelComment).toHaveBeenCalledWith(commentEntity);
    });

    it(`should return result of saveHotelComment method`, async () => {
      const commentEntity = CommentEntity.create(commentParams);
      const commentService = new CommentService(
        null,
        {saveHotelComment: jest.fn().mockReturnValue(commentEntity)},
        {loadUserById: jest.fn().mockReturnValue(UserEntity.create(commentParams.user))},
        {loadHotelById: jest.fn().mockReturnValue(HotelEntity.create(commentParams.hotel))}
      );
      const createHotelCommentResult = await commentService.createHotelComment(hotelCommentParams);
      expect(createHotelCommentResult).toEqual(commentEntity);
    });
  });
});
