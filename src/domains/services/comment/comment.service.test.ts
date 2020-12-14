import { CommentEntity, HotelEntity, IComment, IHotel, IUser, RatingEntity, UserEntity } from 'domains/entities';
import {
  ICommentCreate,
  ICommentSorting,
} from 'domains/interfaces';

import { CommentService } from './comment.service';
import { Uuid } from 'domains/utils';


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
  host: userParams,
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
  favorites: [userParams],
};

const commentParams: IComment = {
  id: `1`,
  text: `text`,
  createdAt: new Date(),
  rating: 4,
  hotel: hotelParams,
  user: userParams,
};

const commentCreateParams: ICommentCreate = {
  text: `text`,
  rating: 4,
  hotelId: hotelParams.id,
  userId: userParams.id,
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
    const userEntity = UserEntity.create(userParams);
    const hotelEntity = HotelEntity.create(hotelParams);
    const ratingEntity = RatingEntity.create({
      value: commentParams.rating,
      hotelId: hotelParams.id,
      userId: userParams.id,
    });

    describe(`loadUserById method of UserLoaderService`, () => {
      it(`should call`, async () => {
        const loadUserById = jest.fn().mockResolvedValueOnce(userEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(loadUserById).toHaveBeenCalledTimes(1);
      });

      it(`should call with "userId" param`, async () => {
        const loadUserById = jest.fn().mockResolvedValueOnce(userEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(loadUserById).toHaveBeenCalledWith(commentCreateParams.userId);
      });

      it(`should throw exception if user not existed`, async () => {
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => null},
          null,
          null,
          null,
          null
        );
        await expect(commentService.createHotelComment(commentCreateParams)).rejects
          .toThrow(new Error(`user with ${commentCreateParams.userId} id is not existed`));
      });
    });

    describe(`loadHotelById method of HotelLoaderService`, () => {
      it(`should call`, async () => {
        const loadHotelById = jest.fn().mockReturnValueOnce(hotelEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(loadHotelById).toHaveBeenCalledTimes(1);
      });

      it(`should call with "hotelId" param`, async () => {
        const loadHotelById = jest.fn().mockReturnValueOnce(hotelEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(loadHotelById).toHaveBeenCalledWith(commentCreateParams.hotelId);
      });

      it(`should throw exception if user not existed`, async () => {
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => null},
          null,
          null,
          {checkRating: async () => false}
        );
        await expect(commentService.createHotelComment(commentCreateParams)).rejects
          .toThrow(new Error(`hotel with ${commentCreateParams.hotelId} id is not existed`));
      });
    });

    describe(`create method of RatingEntity`, () => {
      it(`should call`, async () => {
        RatingEntity.create = jest.fn(RatingEntity.create);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(RatingEntity.create).toHaveBeenCalledTimes(1);
      });

      it(`should call with correct params`, async () => {
        RatingEntity.create = jest.fn(RatingEntity.create);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(RatingEntity.create).toHaveBeenCalledWith({
          userId: commentCreateParams.userId,
          hotelId: commentCreateParams.hotelId,
          value: commentParams.rating,
        });
      });
    });

    describe(`checkRating method of RatingCheckerService`, () => {
      it('should call', async () => {
        const checkRating = jest.fn().mockResolvedValueOnce(false);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(checkRating).toHaveBeenCalledTimes(1);
      });

      it('should call with correct params', async () => {
        const checkRating = jest.fn().mockResolvedValueOnce(false);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(checkRating).toHaveBeenCalledWith(ratingEntity);
      });

      describe(`if result equal "true`, () => {
        it(`should call saveRating of RatingSaverService`, async () => {
          const updateRating = jest.fn();
          const commentService = new CommentService(
            null,
            {saveHotelComment: async () => null},
            {loadUserById: async () => userEntity},
            {loadHotelById: async () => hotelEntity},
            null,
            {updateRating},
            {checkRating: async () => true}
          );
          await commentService.createHotelComment(commentCreateParams);
          expect(updateRating).toHaveBeenCalledTimes(1);
        });

        it(`should call saveRating of RatingSaverService with correct params`, async () => {
          const updateRating = jest.fn();
          const commentService = new CommentService(
            null,
            {saveHotelComment: async () => null},
            {loadUserById: async () => userEntity},
            {loadHotelById: async () => hotelEntity},
            null,
            {updateRating},
            {checkRating: async () => true}
          );
          await commentService.createHotelComment(commentCreateParams);
          expect(updateRating).toHaveBeenCalledWith(ratingEntity);
        });
      });

      describe(`if result equal "false`, () => {
        it(`should call saveRating of RatingSaverService`, async () => {
          const saveRating = jest.fn();
          const commentService = new CommentService(
            null,
            {saveHotelComment: async () => null},
            {loadUserById: async () => userEntity},
            {loadHotelById: async () => hotelEntity},
            {saveRating},
            null,
            {checkRating: async () => false}
          );
          await commentService.createHotelComment(commentCreateParams);
          expect(saveRating).toHaveBeenCalledTimes(1);
        });

        it(`should call saveRating of RatingSaverService with correct params`, async () => {
          const saveRating = jest.fn();
          const commentService = new CommentService(
            null,
            {saveHotelComment: async () => null},
            {loadUserById: async () => userEntity},
            {loadHotelById: async () => hotelEntity},
            {saveRating},
            null,
            {checkRating: async () => false}
          );
          await commentService.createHotelComment(commentCreateParams);
          expect(saveRating).toHaveBeenCalledWith(ratingEntity);
        });
      });
    });

    describe(`create method of CommentEntity`, () => {
      it(`should call`, async () => {
        CommentEntity.create = jest.fn(CommentEntity.create);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(CommentEntity.create).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        Uuid.generate = jest.fn(Uuid.generate).mockReturnValueOnce(`test-id`);
        CommentEntity.create = jest
          .fn(CommentEntity.create);
        const commentService = new CommentService(
          null,
          {saveHotelComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(CommentEntity.create).toHaveBeenCalledWith({
          ...commentCreateParams,
          id: `test-id`,
          hotel: hotelEntity,
          user: userEntity,
        });
      });
    });

    describe(`saveHotelComment method of HotelCommentSaverService`, () => {
      it(`should call`, async () => {
        const saveHotelComment = jest.fn();
        const commentService = new CommentService(
          null,
          {saveHotelComment},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(saveHotelComment).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const commentEntity = CommentEntity.create(commentParams);
        CommentEntity.create = jest.fn(CommentEntity.create).mockReturnValueOnce(commentEntity);
        const saveHotelComment = jest.fn();
        const commentService = new CommentService(
          null,
          {saveHotelComment},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(saveHotelComment).toHaveBeenCalledWith(commentEntity);
      });
    });

    it(`should return result of saveHotelComment method`, async () => {
      const commentEntity = CommentEntity.create(commentParams);
      const commentService = new CommentService(
        null,
        {saveHotelComment: jest.fn().mockReturnValue(commentEntity)},
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity},
        {saveRating: async () => ratingEntity},
        null,
        {checkRating: async () => false}
      );
      const createHotelCommentResult = await commentService.createHotelComment(commentCreateParams);
      expect(createHotelCommentResult).toEqual(commentEntity);
    });
  });
});
