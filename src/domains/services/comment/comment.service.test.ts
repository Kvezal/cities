import { CommentEntity, HotelEntity, IComment, IHotel, RatingEntity, UserEntity } from 'domains/entities';
import { ICommentSorting, IHotelCommentParams } from 'domains/interfaces';

import { CommentService } from './comment.service';


const commentParams: IComment = {
  id: `1`,
  text: `text`,
  createdAt: new Date(),
  rating: {
    value: 4,
    userId: `1`,
    hotelId: `1`,
  },
  hotel: {
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
        id: `1`,
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
  },
  user: {
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
};

const hotelCommentParams: IHotelCommentParams = {
  id: commentParams.id,
  text: commentParams.text,
  createdAt: commentParams.createdAt,
  rating: commentParams.rating,
  hotelId: commentParams.hotel.id,
  userId: commentParams.user.id,
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
        null,
        null,
      );
      const hotelCommentList = await commentService.getHotelCommentList(commentSortingParams);
      expect(hotelCommentList).toEqual([hotelEntity]);
    });
  });

  describe(`createHotelComment`, () => {
    const userEntity = UserEntity.create(commentParams.user);
    const hotelEntity = HotelEntity.create(commentParams.hotel);
    const ratingEntity = RatingEntity.create(commentParams.rating);

    describe(`loadUserById method of UserLoaderService`, () => {
      it(`should call`, async () => {
        const loadUserById = jest.fn().mockResolvedValueOnce(UserEntity.create(commentParams.user));
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadRating: async () => null},
          {saveRating: async () => ratingEntity},
          null,
          {loadUserById},
          {loadHotelById: async () => hotelEntity}
        );
        await commentService.createHotelComment(hotelCommentParams);
        expect(loadUserById).toHaveBeenCalledTimes(1);
      });

      it(`should call with "userId" param`, async () => {
        const loadUserById = jest.fn().mockResolvedValueOnce(userEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadRating: async () => null},
          {saveRating: async () => ratingEntity},
          null,
          {loadUserById},
          {loadHotelById: async () => hotelEntity}
        );
        await commentService.createHotelComment(hotelCommentParams);
        expect(loadUserById).toHaveBeenCalledWith(hotelCommentParams.userId);
      });

      it(`should throw exception if user not existed`, async () => {
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadRating: async () => null},
          {saveRating: async () => null},
          null,
          {loadUserById: async () => null},
          {loadHotelById: async () => null}
        );
        expect(commentService.createHotelComment(hotelCommentParams)).rejects
          .toThrowError(`user with ${hotelCommentParams.userId} id is not existed`);
      });
    });

    describe(`loadHotelById method of HotelLoaderService`, () => {

      it(`should call`, async () => {
        const loadHotelById = jest.fn().mockReturnValueOnce(hotelEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadRating: async () => null},
          {saveRating: async () => ratingEntity},
          null,
          {loadUserById: async () => userEntity},
          {loadHotelById}
        );
        await commentService.createHotelComment(hotelCommentParams);
        expect(loadHotelById).toHaveBeenCalledTimes(1);
      });

      it(`should call with "hotelId" param`, async () => {
        const loadHotelById = jest.fn().mockReturnValueOnce(hotelEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadRating: async () => null},
          {saveRating: async () => ratingEntity},
          null,
          {loadUserById: async () => userEntity},
          {loadHotelById}
        );
        await commentService.createHotelComment(hotelCommentParams);
        expect(loadHotelById).toHaveBeenCalledWith(hotelCommentParams.hotelId);
      });

      it(`should throw exception if user not existed`, async () => {
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadRating: async () => null},
          {saveRating: async () => null},
          null,
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => null}
        );
        expect(commentService.createHotelComment(hotelCommentParams)).rejects
          .toThrowError(`hotel with ${hotelCommentParams.hotelId} id is not existed`);
      });
    });

    describe(`loadRating of RatingLoaderService`, () => {
      it(`should call`, async () => {
        const loadRating = jest.fn();
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadRating},
          {saveRating: async () => ratingEntity},
          null,
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity}
        );
        await commentService.createHotelComment(hotelCommentParams);
        expect(loadRating).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const loadRating = jest.fn();
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadRating},
          {saveRating: async () => ratingEntity},
          null,
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity}
        );
        await commentService.createHotelComment(hotelCommentParams);
        expect(loadRating).toHaveBeenCalledWith(hotelCommentParams.userId, hotelCommentParams.hotelId);
      });

      describe(`if doesn't have rating record`, () => {
        it(`should call create of saveRating of RatingSaverService`, async () => {
          const saveRating = jest.fn().mockReturnValueOnce(ratingEntity);
          const commentService = new CommentService(
            null,
            {saveHotelComment: async () => null},
            {loadRating: async () => null},
            {saveRating},
            null,
            {loadUserById: async () => userEntity},
            {loadHotelById: async () => hotelEntity}
          );
          await commentService.createHotelComment(hotelCommentParams);
          expect(saveRating).toHaveBeenCalledTimes(1);
        });

        it(`should call create of saveRating of RatingSaverService with params`, async () => {
          const saveRating = jest.fn().mockReturnValueOnce(ratingEntity);
          const commentService = new CommentService(
            null,
            {saveHotelComment: async () => null},
            {loadRating: async () => null},
            {saveRating},
            null,
            {loadUserById: async () => userEntity},
            {loadHotelById: async () => hotelEntity}
          );
          await commentService.createHotelComment(hotelCommentParams);
          expect(saveRating).toHaveBeenCalledWith(ratingEntity);
        });
      });

      describe(`if has rating record`, () => {
        it(`should call create of updateRating of RatingUpdaterService`, async () => {
          const updateRating = jest.fn().mockReturnValueOnce(ratingEntity);
          const commentService = new CommentService(
            null,
            {saveHotelComment: async () => null},
            {loadRating: async () => ratingEntity},
            null,
            {updateRating},
            {loadUserById: async () => userEntity},
            {loadHotelById: async () => hotelEntity}
          );
          await commentService.createHotelComment(hotelCommentParams);
          expect(updateRating).toHaveBeenCalledTimes(1);
        });

        it(`should call create of updateRating of RatingUpdaterService with params`, async () => {
          const updateRating = jest.fn().mockReturnValueOnce(ratingEntity);
          const commentService = new CommentService(
            null,
            {saveHotelComment: async () => null},
            {loadRating: async () => ratingEntity},
            null,
            {updateRating},
            {loadUserById: async () => userEntity},
            {loadHotelById: async () => hotelEntity}
          );
          await commentService.createHotelComment(hotelCommentParams);
          expect(updateRating).toHaveBeenCalledWith(ratingEntity);
        });
      })
    });

    it(`should call CommentEntity.create method`, async () => {
      CommentEntity.create = jest.fn(CommentEntity.create);
      const commentService = new CommentService(
        null,
        {saveHotelComment: async () => null},
        {loadRating: async () => null},
        {saveRating: async () => ratingEntity},
        null,
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
      );
      await commentService.createHotelComment(hotelCommentParams);
      expect(CommentEntity.create).toHaveBeenCalledTimes(1);
    });

    it(`should call CommentEntity.create method with params`, async () => {
      CommentEntity.create = jest
        .fn(CommentEntity.create);
      const commentService = new CommentService(
        null,
        {saveHotelComment: async () => null},
        {loadRating: async () => null},
        {saveRating: async () => ratingEntity},
        null,
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
      );
      await commentService.createHotelComment(hotelCommentParams);

      const params: IComment = {
        id: commentParams.id,
        text: commentParams.text,
        createdAt: commentParams.createdAt,
        rating: commentParams.rating,
        hotel: commentParams.hotel,
        user: commentParams.user,
      };
      expect(CommentEntity.create).toHaveBeenCalledWith({
        ...params,
        rating: ratingEntity,
        hotel: hotelEntity,
        user: userEntity,
      });
    });

    it(`should call saveHotelComment method`, async () => {
      const saveHotelComment = jest.fn();
      const commentService = new CommentService(
        null,
        {saveHotelComment},
        {loadRating: async () => null},
        {saveRating: async () => ratingEntity},
        null,
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
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
        {loadRating: async () => null},
        {saveRating: async () => ratingEntity},
        null,
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
      );
      await commentService.createHotelComment(hotelCommentParams);
      expect(saveHotelComment).toHaveBeenCalledWith(commentEntity);
    });

    it(`should return result of saveHotelComment method`, async () => {
      const commentEntity = CommentEntity.create(commentParams);
      const commentService = new CommentService(
        null,
        {saveHotelComment: jest.fn().mockReturnValue(commentEntity)},
        {loadRating: async () => null},
        {saveRating: async () => ratingEntity},
        null,
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity}
      );
      const createHotelCommentResult = await commentService.createHotelComment(hotelCommentParams);
      expect(createHotelCommentResult).toEqual(commentEntity);
    });
  });
});
