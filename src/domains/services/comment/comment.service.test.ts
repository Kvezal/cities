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
  favorites: [
    {
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
      hotelId: commentParams.hotelId,
      userId: commentParams.userId,
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
        await commentService.createHotelComment(commentParams);
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
        await commentService.createHotelComment(commentParams);
        expect(loadUserById).toHaveBeenCalledWith(commentParams.userId);
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
        await expect(commentService.createHotelComment(commentParams)).rejects
          .toThrow(new Error(`user with ${commentParams.userId} id is not existed`));
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
        await commentService.createHotelComment(commentParams);
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
        await commentService.createHotelComment(commentParams);
        expect(loadHotelById).toHaveBeenCalledWith(commentParams.hotelId);
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
        await expect(commentService.createHotelComment(commentParams)).rejects
          .toThrow(new Error(`hotel with ${commentParams.hotelId} id is not existed`));
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
        await commentService.createHotelComment(commentParams);
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
        await commentService.createHotelComment(commentParams);
        expect(RatingEntity.create).toHaveBeenCalledWith({
          userId: commentParams.userId,
          hotelId: commentParams.hotelId,
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
        await commentService.createHotelComment(commentParams);
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
        await commentService.createHotelComment(commentParams);
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
          await commentService.createHotelComment(commentParams);
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
          await commentService.createHotelComment(commentParams);
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
          await commentService.createHotelComment(commentParams);
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
          await commentService.createHotelComment(commentParams);
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
        await commentService.createHotelComment(commentParams);
        expect(CommentEntity.create).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
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
        await commentService.createHotelComment(commentParams);
        expect(CommentEntity.create).toHaveBeenCalledWith(commentParams);
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
        await commentService.createHotelComment(commentParams);
        expect(saveHotelComment).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const commentEntity = CommentEntity.create(commentParams);
        const saveHotelComment = jest.fn().mockReturnValue(commentEntity);
        const commentService = new CommentService(
          null,
          {saveHotelComment},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
          {saveRating: async () => ratingEntity},
          null,
          {checkRating: async () => false}
        );
        await commentService.createHotelComment(commentParams);
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
      const createHotelCommentResult = await commentService.createHotelComment(commentParams);
      expect(createHotelCommentResult).toEqual(commentEntity);
    });
  });
});
