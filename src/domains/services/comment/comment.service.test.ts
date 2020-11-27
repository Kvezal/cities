import { CommentEntity, HotelEntity, IComment, IHotel, IUser, RatingEntity, UserEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';

import { CommentService } from './comment.service';


const commentParams: IComment = {
  id: `1`,
  text: `text`,
  createdAt: new Date(),
  rating: 4,
  hotelId: `1`,
  userId: `1`,
};

const hotelParams: IHotel = {
  id: `1`,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [
    {
      id: `1`,
      title: `title`,
    },
    {
      id: `2`,
      title: `title`,
    }
  ],
  type: {
    id: `1`,
    title: `title`,
  },
  city: {
    id: `1`,
    title: `title`,
    location: {
      id: `1`,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: `1`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: `1`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: `1`,
      title: `title`,
    },
    image: {
      id: `1`,
      title: `title`,
    },
  },
  images: [
    {
      id: `1`,
      title: `title`,
    },
    {
      id: `2`,
      title: `title`,
    }
  ],
};

const userParams: IUser = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  image: {
    id: `1`,
    title: `title`,
  },
  type: {
    id: `1`,
    title: `title`,
  },
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
        null,
        null,
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
        null,
        null,
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
        null,
        null,
      );
      const hotelCommentList = await commentService.getHotelCommentList(commentSortingParams);
      expect(hotelCommentList).toEqual([hotelEntity]);
    });
  });

  describe(`createHotelComment`, () => {
    const userEntity = UserEntity.create(userParams);
    const hotelEntity = HotelEntity.create(hotelParams);
    const ratingEntity = RatingEntity.create({
      value: commentParams.rating,
      hotelId: commentParams.hotelId,
      userId: commentParams.userId,
    });

    describe(`loadUserById method of UserLoaderService`, () => {
      it(`should call`, async () => {
        const loadUserById = jest.fn().mockResolvedValueOnce(userEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {saveRating: async () => ratingEntity},
          {loadUserById},
          {loadHotelById: async () => hotelEntity}
        );
        await commentService.createHotelComment(commentParams);
        expect(loadUserById).toHaveBeenCalledTimes(1);
      });

      it(`should call with "userId" param`, async () => {
        const loadUserById = jest.fn().mockResolvedValueOnce(userEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {saveRating: async () => ratingEntity},
          {loadUserById},
          {loadHotelById: async () => hotelEntity}
        );
        await commentService.createHotelComment(commentParams);
        expect(loadUserById).toHaveBeenCalledWith(commentParams.userId);
      });

      it(`should throw exception if user not existed`, async () => {
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {saveRating: async () => null},
          {loadUserById: async () => null},
          {loadHotelById: async () => null}
        );
        expect(commentService.createHotelComment(commentParams)).rejects
          .toThrowError(`user with ${commentParams.userId} id is not existed`);
      });
    });

    describe(`loadHotelById method of HotelLoaderService`, () => {

      it(`should call`, async () => {
        const loadHotelById = jest.fn().mockReturnValueOnce(hotelEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {saveRating: async () => ratingEntity},
          {loadUserById: async () => userEntity},
          {loadHotelById}
        );
        await commentService.createHotelComment(commentParams);
        expect(loadHotelById).toHaveBeenCalledTimes(1);
      });

      it(`should call with "hotelId" param`, async () => {
        const loadHotelById = jest.fn().mockReturnValueOnce(hotelEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {saveRating: async () => ratingEntity},
          {loadUserById: async () => userEntity},
          {loadHotelById}
        );
        await commentService.createHotelComment(commentParams);
        expect(loadHotelById).toHaveBeenCalledWith(commentParams.hotelId);
      });

      it(`should throw exception if user not existed`, async () => {
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {saveRating: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => null}
        );
        expect(commentService.createHotelComment(commentParams)).rejects
          .toThrowError(`hotel with ${commentParams.hotelId} id is not existed`);
      });
    });

    it(`should call CommentEntity.create method`, async () => {
      CommentEntity.create = jest.fn(CommentEntity.create);
      const commentService = new CommentService(
        null,
        {saveHotelComment: async () => null},
        {saveRating: async () => ratingEntity},
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
      );
      await commentService.createHotelComment(commentParams);
      expect(CommentEntity.create).toHaveBeenCalledTimes(1);
    });

    it(`should call CommentEntity.create method with params`, async () => {
      CommentEntity.create = jest
        .fn(CommentEntity.create);
      const commentService = new CommentService(
        null,
        {saveHotelComment: async () => null},
        {saveRating: async () => ratingEntity},
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
      );
      await commentService.createHotelComment(commentParams);
      expect(CommentEntity.create).toHaveBeenCalledWith(commentParams);
    });

    it(`should call saveHotelComment method`, async () => {
      const saveHotelComment = jest.fn();
      const commentService = new CommentService(
        null,
        {saveHotelComment},
        {saveRating: async () => ratingEntity},
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
      );
      await commentService.createHotelComment(commentParams);
      expect(saveHotelComment).toHaveBeenCalledTimes(1);
    });

    it(`should call saveHotelComment method with params`, async () => {
      const commentEntity = CommentEntity.create(commentParams);
      const saveHotelComment = jest.fn().mockReturnValue(commentEntity);
      const commentService = new CommentService(
        null,
        {saveHotelComment},
        {saveRating: async () => ratingEntity},
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
      );
      await commentService.createHotelComment(commentParams);
      expect(saveHotelComment).toHaveBeenCalledWith(commentEntity);
    });

    it(`should return result of saveHotelComment method`, async () => {
      const commentEntity = CommentEntity.create(commentParams);
      const commentService = new CommentService(
        null,
        {saveHotelComment: jest.fn().mockReturnValue(commentEntity)},
        {saveRating: async () => ratingEntity},
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
      );
      const createHotelCommentResult = await commentService.createHotelComment(commentParams);
      expect(createHotelCommentResult).toEqual(commentEntity);
    });
  });
});
