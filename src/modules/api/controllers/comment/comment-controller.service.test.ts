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
  IJsonWebTokenParams,
} from 'domains/entities';
import { CommentViewMapper } from 'modules/adapters';


const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  image: null,
};

const commentParams: IComment = {
  text: Array(20).fill(`i`).join(``),
  hotelId: `000e1960-fa36-4a99-b8c0-c4eb96e823e3`,
  rating: 4,
  userId: jsonWebTokenParams.id
};

const commentEntityParams: IComment = {
  id: `005d67a0-58c1-40a5-a664-53ed22206a6e`,
  text: commentParams.text,
  createdAt: new Date(),
  hotelId: commentParams.hotelId,
  userId: jsonWebTokenParams.id,
  rating: commentParams.rating,
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

    describe(`mapToOrmEntity method of CommentViewMapper`, () => {
      it(`should call`, async () => {
        CommentViewMapper.mapToOrmEntity = jest.fn(CommentViewMapper.mapToOrmEntity);
        await service.createHotelComment(commentParams);
        expect(CommentViewMapper.mapToOrmEntity).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        CommentViewMapper.mapToOrmEntity = jest.fn(CommentViewMapper.mapToOrmEntity);
        await service.createHotelComment(commentParams);
        expect(CommentViewMapper.mapToOrmEntity).toHaveBeenCalledWith(commentEntity);
      });
    });

    it(`should return correct result`, async () => {
      const commentOrmEntity = CommentViewMapper.mapToOrmEntity(commentEntity);
      CommentViewMapper.mapToOrmEntity = jest.fn(CommentViewMapper.mapToOrmEntity).mockReturnValue(commentOrmEntity);
      const result = await service.createHotelComment(commentParams);
      expect(result).toBe(commentOrmEntity);
    });
  });
});
