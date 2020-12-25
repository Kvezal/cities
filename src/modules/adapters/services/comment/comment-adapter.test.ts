import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import {
  CommentEntity,
  IComment,
} from 'domains/entities';
import { HotelAdapterService } from 'modules/adapters';
import { CommentsDbTable } from 'modules/db';
import { ICommentTableParams } from 'modules/db/interfaces';

import { CommentMapper } from '../../mappers';
import { CommentAdapterService } from './comment-adapter.service';


const commentTableParams: ICommentTableParams = {
  id: `d9f29621-4739-4305-a72f-90a04542cb28`,
  text: `text`,
  created_at: new Date().toISOString(),
  rating: 4,
  user: {
    id: `db709632-439a-4c90-a151-044e28919754`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    image: {
      id: `e8c1ee3c-0070-4902-b840-7cf94ea3c049`,
      title: `title`,
    },
    type: {
      id: `fb847d59-7745-43ae-b7d5-c5fec95d1efc`,
      title: `title`,
    },
  },
  hotel_id: `d3db316e-dbe7-43af-b1a9-b184d4baa264`,
};

const commentEntityParams: IComment = {
  id: commentTableParams.id,
  text: commentTableParams.text,
  createdAt: new Date(commentTableParams.created_at),
  rating: commentTableParams.rating,
  hotelId: commentTableParams.hotel_id,
  user: {
    id: commentTableParams.user.id,
    name: commentTableParams.user.name,
    email: commentTableParams.user.email,
    password: commentTableParams.user.password,
    image: {
      id: commentTableParams.user.image.id,
      title: commentTableParams.user.image.title,
    },
    type: {
      id: commentTableParams.user.type.id,
      title: commentTableParams.user.type.title,
    },
  },
};

describe(`Comment Adapter Service`, () => {
  let service: CommentAdapterService;
  let commentsDbTable: CommentsDbTable;
  const commentEntity = CommentEntity.create(commentEntityParams);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        CommentAdapterService,
        {
          provide: HotelAdapterService,
          useValue: {},
        },
        {
          provide: CommentsDbTable,
          useValue: {
            findAll: async () => null,
            createOne: async () => commentTableParams,
          }
        },
      ],
    }).compile();
    service = testModule.get<CommentAdapterService>(CommentAdapterService);
    commentsDbTable = testModule.get<CommentsDbTable>(CommentsDbTable);
  });

  describe(`loadCommentList method`, () => {
    describe(`getCommentHotelList method of CommentAdapterService`, () => {
      it(`should call`, async () => {
        const findAll = jest.spyOn(commentsDbTable, `findAll`).mockResolvedValueOnce([commentTableParams])
        await service.loadCommentList({hotelId: `1`});
        expect(findAll).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findAll = jest.spyOn(commentsDbTable, `findAll`).mockResolvedValueOnce([commentTableParams])
        await service.loadCommentList({hotelId: `1`});
        expect(findAll).toHaveBeenCalledWith({hotel_id: `1`});
      });
    });

    describe(`if find method result equal empty list`, () => {
      it(`shouldn't call mapToDomain of CommentViewMapper`, async () => {
        CommentMapper.mapToDomain = jest.fn(CommentMapper.mapToDomain);
        jest.spyOn(commentsDbTable, `findAll`).mockResolvedValueOnce([])
        await service.loadCommentList({hotelId: `1`});
        expect(CommentMapper.mapToDomain).toHaveBeenCalledTimes(0);
      });

      it(`should return empty array`, async () => {
        jest.spyOn(commentsDbTable, `findAll`).mockResolvedValueOnce([])
        const result = await service.loadCommentList({hotelId: `1`});
        expect(result).toHaveLength(0);
      });
    });
  });

  describe(`saveHotelComment method`, () => {
    describe(`mapToDomain method of  CommentViewMapper`, () => {
      it(`should call`, async () => {
        CommentMapper.mapToTableParams = jest.fn(CommentMapper.mapToTableParams);
        await service.saveComment(commentEntity);
        expect(CommentMapper.mapToTableParams).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        CommentMapper.mapToTableParams = jest.fn(CommentMapper.mapToTableParams);
        await service.saveComment(commentEntity);
        expect(CommentMapper.mapToTableParams).toHaveBeenCalledWith(commentEntity);
      });
    });

    describe(`save method of CommentRepository`, () => {
      it(`should call`, async () => {
        const createOne = jest.spyOn(commentsDbTable, `createOne`).mockImplementation(async () => commentTableParams);
        await service.saveComment(commentEntity);
        expect(createOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const createOne = jest.spyOn(commentsDbTable, `createOne`).mockImplementationOnce(async () => commentTableParams);
        await service.saveComment(commentEntity);
        expect(createOne).toHaveBeenCalledWith(commentTableParams);
      });
    });

    it(`should return correct result`, async () => {
      const result = await service.saveComment(commentEntity);
      expect(result).toEqual(commentEntity);
    });
  });
});
