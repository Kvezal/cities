import {
  CommentEntity,
  HotelEntity,
  IComment,
  IHotel,
  UserEntity,
} from 'domains/entities';
import {
  ICommentCreate,
  ICommentSorting,
} from 'domains/interfaces';

import { CommentService } from './comment.service';


const hotelParams: IHotel = {
  id: `934928b7-90e5-4482-8967-941b84b08994`,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [
    {
      id: `93498b22-73e4-40ab-a632-faf9ff7da893`,
      title: `title`,
    },
    {
      id: `c17dab56-94f8-4d86-9835-221b5b7291f2`,
      title: `title`,
    }
  ],
  type: {
    id: `cbf10244-cae7-47ac-b385-b2ceb103051a`,
    title: `title`,
  },
  city: {
    id: `d3db316e-dbe7-43af-b1a9-b184d4baa264`,
    title: `title`,
    location: {
      id: `d9f29621-4739-4305-a72f-90a04542cb28`,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: `db709632-439a-4c90-a151-044e28919754`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: `e8c1ee3c-0070-4902-b840-7cf94ea3c049`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: `fb847d59-7745-43ae-b7d5-c5fec95d1efc`,
      title: `title`,
    },
    image: {
      id: `000554d8-6d39-456d-96a2-9320d8bca76d`,
      title: `title`,
    },
  },
  images: [
    {
      id: `35b1508b-fca3-4ee9-b8c9-151660abf438`,
      title: `title`,
    },
    {
      id: `374e7084-31d3-461a-ab80-d1adb1d6ff93`,
      title: `title`,
    }
  ],
  isFavorite: false,
};

const commentParams: IComment = {
  id: `000554d8-6d39-456d-96a2-9320d8bca76d`,
  text: `text`,
  createdAt: new Date(),
  rating: 4,
  hotelId: hotelParams.id,
  user: {
    id: `374e7084-31d3-461a-ab80-d1adb1d6ff93`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    image: {
      id: `4d348ea5-fb35-4085-b2be-5bee2655bf31`,
      title: `title`,
    },
    type: {
      id: `8ddf062f-8d34-4719-80dd-c3f70ac3055f`,
      title: `title`,
    },
  },
};

const commentCreateParams: ICommentCreate = {
  text: commentParams.text,
  rating: commentParams.rating,
  hotelId: commentParams.hotelId,
  userId: commentParams.user.id,
};

const commentSortingParams: ICommentSorting = {
  hotelId: commentParams.hotelId,
};

describe(`Comment Service`, () => {
  describe(`getHotelCommentList method`, () => {
    it(`should call loadHotelCommentList method`, async () => {
      const loadCommentList = jest.fn();
      const commentService = new CommentService(
        {loadCommentList},
        null,
        null,
        null,
      );
      await commentService.getHotelCommentList(commentSortingParams);
      expect(loadCommentList).toHaveBeenCalledTimes(1);
    });

    it(`should call loadHotelCommentList method with correct params`, async () => {
      const loadCommentList = jest.fn();
      const commentService = new CommentService(
        {loadCommentList},
        null,
        null,
        null,
      );
      await commentService.getHotelCommentList(commentSortingParams);
      expect(loadCommentList).toHaveBeenCalledWith(commentSortingParams);
    });

    it(`should return result of loadHotelCommentList method`, async () => {
      const hotelEntity = HotelEntity.create(hotelParams);
      const loadCommentList = jest.fn().mockReturnValue([hotelEntity]);
      const commentService = new CommentService(
        {loadCommentList},
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
    const hotelEntity = HotelEntity.create(hotelParams);

    describe(`loadUserById method of UserLoaderService`, () => {
      it(`should call`, async () => {
        const loadUserById = jest.fn().mockResolvedValueOnce(userEntity);
        const commentService = new CommentService(
          null,
          {saveComment: async () => null},
          {loadUserById},
          {loadHotelById: async () => hotelEntity},
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(loadUserById).toHaveBeenCalledTimes(1);
      });

      it(`should call with "userId" param`, async () => {
        const loadUserById = jest.fn().mockResolvedValueOnce(userEntity);
        const commentService = new CommentService(
          null,
          {saveComment: async () => null},
          {loadUserById},
          {loadHotelById: async () => hotelEntity},
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(loadUserById).toHaveBeenCalledWith(commentCreateParams.userId);
      });

      it(`should throw exception if user not existed`, async () => {
        const commentService = new CommentService(
          null,
          {saveComment: async () => null},
          {loadUserById: async () => null},
          null,
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
          {saveComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById},
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(loadHotelById).toHaveBeenCalledTimes(1);
      });

      it(`should call with "hotelId" param`, async () => {
        const loadHotelById = jest.fn().mockReturnValueOnce(hotelEntity);
        const commentService = new CommentService(
          null,
          {saveComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById},
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(loadHotelById).toHaveBeenCalledWith(commentCreateParams.hotelId);
      });

      it(`should throw exception if user not existed`, async () => {
        const commentService = new CommentService(
          null,
          {saveComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => null},
        );
        await expect(commentService.createHotelComment(commentCreateParams)).rejects
          .toThrow(new Error(`hotel with ${commentCreateParams.hotelId} id is not existed`));
      });
    });

    describe(`create method of CommentEntity`, () => {
      it(`should call`, async () => {
        CommentEntity.create = jest.fn(CommentEntity.create);
        const commentService = new CommentService(
          null,
          {saveComment: async () => null},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(CommentEntity.create).toHaveBeenCalledTimes(1);
      });
    });

    describe(`saveHotelComment method of HotelCommentSaverService`, () => {
      it(`should call`, async () => {
        const saveComment = jest.fn();
        const commentService = new CommentService(
          null,
          {saveComment},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(saveComment).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const commentEntity = CommentEntity.create(commentParams);
        CommentEntity.create = jest.fn(CommentEntity.create).mockReturnValueOnce(commentEntity);
        const saveComment = jest.fn();
        const commentService = new CommentService(
          null,
          {saveComment},
          {loadUserById: async () => userEntity},
          {loadHotelById: async () => hotelEntity},
        );
        await commentService.createHotelComment(commentCreateParams);
        expect(saveComment).toHaveBeenCalledWith(commentEntity);
      });
    });

    it(`should return result of saveHotelComment method`, async () => {
      const commentEntity = CommentEntity.create(commentParams);
      const commentService = new CommentService(
        null,
        {saveComment: jest.fn().mockReturnValue(commentEntity)},
        {loadUserById: async () => userEntity},
        {loadHotelById: async () => hotelEntity},
      );
      const createHotelCommentResult = await commentService.createHotelComment(commentCreateParams);
      expect(createHotelCommentResult).toEqual(commentEntity);
    });
  });
});
