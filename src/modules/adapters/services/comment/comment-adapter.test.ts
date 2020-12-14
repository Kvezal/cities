import { Repository } from 'typeorm';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  CommentEntity,
  IComment,
  IHotel,
  IUser,
} from 'domains/entities';
import { HotelAdapterService } from 'modules/adapters';

import { CommentOrmEntity } from '../../orm-entities';
import { CommentMapper } from '../../mappers';
import { CommentAdapterService } from './comment-adapter.service';


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
  user: userParams,
  hotel: hotelParams,
};

describe(`Comment Adapter Service`, () => {
  let service: CommentAdapterService;
  let commentRepositoryService: Repository<CommentOrmEntity>;
  const commentEntity = CommentEntity.create(commentParams);
  const commentOrmEntity = CommentMapper.mapToOrmEntity(commentEntity)

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        CommentAdapterService,
        {
          provide: HotelAdapterService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(CommentOrmEntity),
          useClass: Repository
        },
      ],
    }).compile();
    service = testModule.get<CommentAdapterService>(CommentAdapterService);
    commentRepositoryService = testModule.get<Repository<CommentOrmEntity>>(getRepositoryToken(CommentOrmEntity));
  });

  describe(`loadHotelCommentList method`, () => {
    describe(`getCommentHotelList method of CommentAdapterService`, () => {
      it(`should call`, async () => {
        service.getCommentHotelList = jest.fn(service.getCommentHotelList).mockResolvedValueOnce([]);
        await service.loadHotelCommentList({hotelId: `1`});
        expect(service.getCommentHotelList).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        service.getCommentHotelList = jest.fn(service.getCommentHotelList).mockResolvedValueOnce([]);
        await service.loadHotelCommentList({hotelId: `1`});
        expect(service.getCommentHotelList).toHaveBeenCalledWith({hotelId: `1`});
      });
    });

    describe(`if find method result equal empty list`, () => {
      it(`shouldn't call mapToDomain of CommentViewMapper`, async () => {
        CommentMapper.mapToDomain = jest.fn(CommentMapper.mapToDomain);
        service.getCommentHotelList = jest.fn(service.getCommentHotelList).mockResolvedValueOnce([]);
        await service.loadHotelCommentList({hotelId: `1`});
        expect(CommentMapper.mapToDomain).toHaveBeenCalledTimes(0);
      });

      it(`should return empty array`, async () => {
        service.getCommentHotelList = jest.fn(service.getCommentHotelList).mockResolvedValueOnce([]);
        const result = await service.loadHotelCommentList({hotelId: `1`});
        expect(result).toHaveLength(0);
      });
    });

    describe(`if find method result has CommentOrmEntity`, () => {
      const commentOrmEntities: CommentOrmEntity[] = [
        commentOrmEntity,
        commentOrmEntity,
      ];

      describe(`mapToDomain method of CommentViewMapper`, () => {
        it(`should call`, async () => {
          CommentMapper.mapToDomain = jest.fn(CommentMapper.mapToDomain);
          service.getCommentHotelList = jest.fn(service.getCommentHotelList).mockResolvedValueOnce(commentOrmEntities);
          await service.loadHotelCommentList({hotelId: `1`});
          expect(CommentMapper.mapToDomain).toHaveBeenCalledTimes(2);
        });

        it(`should call with params`, async () => {
          CommentMapper.mapToDomain = jest.fn(CommentMapper.mapToDomain);
          service.getCommentHotelList = jest.fn(service.getCommentHotelList).mockResolvedValueOnce(commentOrmEntities);
          await service.loadHotelCommentList({hotelId: `1`});
          expect(CommentMapper.mapToDomain).toHaveBeenNthCalledWith(1, commentOrmEntities[0]);
          expect(CommentMapper.mapToDomain).toHaveBeenNthCalledWith(2, commentOrmEntities[1]);
        });
      });

      it(`should return empty array`, async () => {
        const commentEntities: CommentEntity[] = commentOrmEntities.map(CommentMapper.mapToDomain);
        service.getCommentHotelList = jest.fn(service.getCommentHotelList).mockResolvedValueOnce(commentOrmEntities);
        const result = await service.loadHotelCommentList({hotelId: `1`});
        expect(result).toEqual(commentEntities);
      });
    });
  });

  describe(`saveHotelComment method`, () => {
    beforeEach(() => {
      jest.spyOn(commentRepositoryService, `save`).mockImplementationOnce(() => null);
    });

    describe(`mapToDomain method of  CommentViewMapper`, () => {
      it(`should call`, async () => {
        CommentMapper.mapToOrmEntity = jest.fn(CommentMapper.mapToOrmEntity);
        await service.saveHotelComment(commentEntity);
        expect(CommentMapper.mapToOrmEntity).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        CommentMapper.mapToOrmEntity = jest.fn(CommentMapper.mapToOrmEntity);
        await service.saveHotelComment(commentEntity);
        expect(CommentMapper.mapToOrmEntity).toHaveBeenCalledWith(commentEntity);
      });
    });

    describe(`save method of CommentRepository`, () => {
      it(`should call`, async () => {
        const save = jest.spyOn(commentRepositoryService, `save`).mockImplementation(() => null);
        await service.saveHotelComment(commentEntity);
        expect(save).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const commentOrmEntity = CommentMapper.mapToOrmEntity(commentEntity);
        const save = jest.spyOn(commentRepositoryService, `save`).mockImplementationOnce(() => null);
        await service.saveHotelComment(commentEntity);
        expect(save).toHaveBeenCalledWith(commentOrmEntity);
      });
    });

    it(`should return correct result`, async () => {
      const result = await service.saveHotelComment(commentEntity);
      expect(result).toBe(commentEntity);
    });
  });
});
