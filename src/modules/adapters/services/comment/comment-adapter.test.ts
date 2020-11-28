import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CommentEntity } from 'domains/entities'
  ;
import { CommentOrmEntity } from '../../orm-entities';
import { CommentViewMapper } from '../../mappers';
import { CommentViewOrmEntity } from '../../view-orm-entities';
import { CommentAdapterService } from './comment-adapter.service';


const hotelCommentParams: CommentViewOrmEntity = {
  id: `1`,
  text: `text`,
  createdAt: new Date(),
  rating: 4,
  hotelId: `1`,
  userId: `1`,
};

describe(`Comment Adapter Service`, () => {
  let service: CommentAdapterService;
  let commentRepositoryService: Repository<CommentOrmEntity>;
  let commentViewRepositoryService: Repository<CommentViewOrmEntity>;
  const commentEntity = CommentViewMapper.mapToDomain(hotelCommentParams);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        CommentAdapterService,
        {
          provide: getRepositoryToken(CommentOrmEntity),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(CommentViewOrmEntity),
          useClass: Repository
        },
      ],
    }).compile();
    service = testModule.get<CommentAdapterService>(CommentAdapterService);
    commentRepositoryService = testModule.get<Repository<CommentOrmEntity>>(getRepositoryToken(CommentOrmEntity));
    commentViewRepositoryService = testModule.get<Repository<CommentViewOrmEntity>>(getRepositoryToken(CommentViewOrmEntity));
  });

  describe(`loadHotelCommentList method`, () => {
    describe(`find of comment with rating repository`, () => {
      it(`should call`, async () => {
        const find = jest.spyOn(commentViewRepositoryService, `find`).mockImplementation(async () => []);
        await service.loadHotelCommentList({hotelId: `1`});
        expect(find).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const hotelCommentParams = {hotelId: `1`};
        const find = jest.spyOn(commentViewRepositoryService, `find`).mockImplementation(async () => []);
        await service.loadHotelCommentList(hotelCommentParams);
        expect(find).toHaveBeenCalledWith({
          where: hotelCommentParams
        });
      });
    });

    describe(`if find method result equal empty list`, () => {
      it(`shouldn't call mapToDomain of CommentViewMapper`, async () => {
        CommentViewMapper.mapToDomain = jest.fn(CommentViewMapper.mapToDomain);
        jest.spyOn(commentViewRepositoryService, `find`).mockImplementation(async () => []);
        await service.loadHotelCommentList({hotelId: `1`});
        expect(CommentViewMapper.mapToDomain).toHaveBeenCalledTimes(0);
      });

      it(`should return empty array`, async () => {
        jest.spyOn(commentViewRepositoryService, `find`).mockImplementation(async () => []);
        const result = await service.loadHotelCommentList({hotelId: `1`});
        expect(result).toEqual([]);
      });
    });

    describe(`if find method result has CommentViewOrmEntity`, () => {
      const commentOrmEntities: CommentViewOrmEntity[] = [
        hotelCommentParams,
        {
          ...hotelCommentParams,
          id: `2`,
        }
      ];

      describe(`mapToDomain method of CommentViewMapper`, () => {
        it(`should call`, async () => {
          CommentViewMapper.mapToDomain = jest.fn(CommentViewMapper.mapToDomain);
          jest.spyOn(commentViewRepositoryService, `find`).mockImplementation(async () => commentOrmEntities);
          await service.loadHotelCommentList({hotelId: `1`});
          expect(CommentViewMapper.mapToDomain).toHaveBeenCalledTimes(2);
        });

        it(`should call with params`, async () => {
          CommentViewMapper.mapToDomain = jest.fn(CommentViewMapper.mapToDomain);
          jest.spyOn(commentViewRepositoryService, `find`).mockImplementation(async () => commentOrmEntities);
          await service.loadHotelCommentList({hotelId: `1`});
          expect(CommentViewMapper.mapToDomain).toHaveBeenNthCalledWith(1, commentOrmEntities[0]);
          expect(CommentViewMapper.mapToDomain).toHaveBeenNthCalledWith(2, commentOrmEntities[1]);
        });
      });

      it(`should return empty array`, async () => {
        const commentEntities: CommentEntity[] = commentOrmEntities.map(CommentViewMapper.mapToDomain);
        jest.spyOn(commentViewRepositoryService, `find`).mockImplementation(async () => commentOrmEntities);
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
        CommentViewMapper.mapToOrmEntity = jest.fn(CommentViewMapper.mapToOrmEntity);
        await service.saveHotelComment(commentEntity);
        expect(CommentViewMapper.mapToOrmEntity).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        CommentViewMapper.mapToOrmEntity = jest.fn(CommentViewMapper.mapToOrmEntity);
        await service.saveHotelComment(commentEntity);
        expect(CommentViewMapper.mapToOrmEntity).toHaveBeenCalledWith(commentEntity);
      });
    });

    describe(`save method of CommentRepository`, () => {
      it(`should call`, async () => {
        const save = jest.spyOn(commentRepositoryService, `save`).mockImplementation(() => null);
        await service.saveHotelComment(commentEntity);
        expect(save).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const commentOrmEntity = CommentViewMapper.mapToOrmEntity(commentEntity);
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
