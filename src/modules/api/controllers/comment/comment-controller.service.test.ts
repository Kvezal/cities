import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { CommentControllerService } from './comment-controller.service';
import {
  CommentService,
  commentServiceSymbol,
} from 'domains/services';
import {
  CommentEntity,
  IComment,
  IHotel,
  IUser,
} from 'domains/entities';
import {
  ICommentCreate,
  ICommentSorting,
} from 'domains/interfaces';
import { CommentOutput } from 'modules/api/interfaces';


const commentSortingParams: ICommentSorting = {
  hotelId: `1`,
}

const userParams: IUser = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
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

const commentParams: ICommentCreate = {
  text: Array(20).fill(`i`).join(``),
  hotelId: hotelParams.id,
  rating: 4,
  userId: userParams.id
};

const commentEntityParams: IComment = {
  id: `005d67a0-58c1-40a5-a664-53ed22206a6e`,
  text: commentParams.text,
  createdAt: new Date(),
  hotel: hotelParams,
  user: userParams,
  rating: commentParams.rating,
};

const expectedCommentOutput: CommentOutput = {
  id: commentEntityParams.id,
  text: commentEntityParams.text,
  createdAt: commentEntityParams.createdAt,
  rating: commentEntityParams.rating,
  user: {
    id: userParams.id,
    name: userParams.name,
    type: userParams.type.title,
    image: userParams.image.title,
  }
};

describe('CommentControllerService', () => {
  let service: CommentControllerService;
  let commentService: CommentService;
  const commentEntity = CommentEntity.create(commentEntityParams);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentControllerService,
        {
          provide: commentServiceSymbol,
          useValue: {
            getHotelCommentList: async () => [commentEntity],
            createHotelComment: async () => commentEntity,
          },
        },
      ],
    }).compile();

    service = module.get<CommentControllerService>(CommentControllerService);
    commentService = module.get<CommentService>(commentServiceSymbol);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createHotelComment method', () => {
    describe(`createHotelComment method of CommentService`, () => {
      it(`should call`, async () => {
        const createHotelComment = jest.spyOn(commentService, `createHotelComment`)
          .mockImplementationOnce(async () => commentEntity);
        await service.createHotelComment(commentParams);
        expect(createHotelComment).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const createHotelComment = jest.spyOn(commentService, `createHotelComment`)
          .mockImplementationOnce(async () => commentEntity);
        await service.createHotelComment(commentParams);
        expect(createHotelComment).toHaveBeenCalledWith(commentParams);
      });
    });

    describe(`transformEntityToOutputData method of CommentControllerService`, () => {
      it(`should call`, async () => {
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.createHotelComment(commentParams);
        expect(service.transformEntityToOutputData).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.createHotelComment(commentParams);
        expect(service.transformEntityToOutputData).toHaveBeenCalledWith(commentEntity);
      });
    });

    it(`should return correct result`, async () => {
      service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData)
        .mockReturnValue(expectedCommentOutput);
      const result = await service.createHotelComment(commentParams);
      expect(result).toBe(expectedCommentOutput);
    });
  });

  describe(`getHotelCommentList method`, () => {
    describe(`getHotelCommentList method of CommentService`, () => {
      it(`should call`, () => {
        commentService.getHotelCommentList = jest.fn(commentService.getHotelCommentList);
        service.getHotelCommentList(commentSortingParams);
        expect(commentService.getHotelCommentList).toBeCalledTimes(1);
      });

      it(`should call with params`, () => {
        commentService.getHotelCommentList = jest.fn(commentService.getHotelCommentList);
        service.getHotelCommentList(commentSortingParams);
        expect(commentService.getHotelCommentList).toBeCalledWith(commentSortingParams);
      });
    });

    describe(`transformEntityToOutputData method of CommentControllerService`, () => {
      const commentEntities = [commentEntity, commentEntity];

      it(`should call`, async () => {
        commentService.getHotelCommentList = jest.fn(commentService.getHotelCommentList)
          .mockResolvedValueOnce(commentEntities);
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.getHotelCommentList(commentSortingParams);
        expect(service.transformEntityToOutputData).toHaveBeenCalledTimes(commentEntities.length);
      });

      it(`should call with params`, async () => {
        commentService.getHotelCommentList = jest.fn(commentService.getHotelCommentList)
          .mockResolvedValueOnce(commentEntities);
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.getHotelCommentList(commentSortingParams);
        expect(service.transformEntityToOutputData).toHaveBeenNthCalledWith(1, commentEntity);
        expect(service.transformEntityToOutputData).toHaveBeenNthCalledWith(2, commentEntity);
      });
    });

    it(`should return correct result`, async () => {
      commentService.getHotelCommentList = jest.fn(commentService.getHotelCommentList)
        .mockResolvedValueOnce([commentEntity]);
      service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData)
        .mockReturnValue(expectedCommentOutput);
      const result: CommentOutput[] = await service.getHotelCommentList(commentSortingParams);
      expect(result).toEqual([expectedCommentOutput]);
    });
  });

  describe(`transformEntityToOutputData method`, () => {
    it(`should return correct result`, () => {
      const result = service.transformEntityToOutputData(commentEntity);
      expect(result).toEqual(expectedCommentOutput)
    });
  });
});
