import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IRating, RatingEntity } from 'domains/entities';

import { RatingOrmEntity } from '../../orm-entities';
import { RatingMapper } from '../../mappers';
import { RatingAdapterService } from './rating-adapter.service';


const ratingParams: IRating = {
  value: 4,
  userId: `1`,
  hotelId: `1`,
};


describe(`Rating Adapter Service`, () => {
  let service: RatingAdapterService;
  let repository: Repository<RatingOrmEntity>;
  const ratingEntity: RatingEntity = RatingEntity.create(ratingParams);
  const ratingOrmEntity: RatingOrmEntity = RatingMapper.mapToOrmEntity(ratingEntity);

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        RatingAdapterService,
        {
          provide: getRepositoryToken(RatingOrmEntity),
          useClass: Repository
        },
      ],
    }).compile();
    service = testModule.get<RatingAdapterService>(RatingAdapterService);
    repository = testModule.get<Repository<RatingOrmEntity>>(getRepositoryToken(RatingOrmEntity))
  });

  describe(`checkRating method`, () => {
    describe(`mapToOrmEntity method of RatingMapper`, () => {
      beforeEach(() => {
        repository.hasId = () => false;
      });

      it('should call', async () => {
        RatingMapper.mapToOrmEntity = jest.fn(RatingMapper.mapToOrmEntity);
        await service.checkRating(ratingEntity);
        expect(RatingMapper.mapToOrmEntity).toHaveBeenCalledTimes(1);
      });

      it('should call with params', async () => {
        RatingMapper.mapToOrmEntity = jest.fn(RatingMapper.mapToOrmEntity);
        await service.checkRating(ratingEntity);
        expect(RatingMapper.mapToOrmEntity).toHaveBeenCalledWith(ratingEntity);
      });
    });

    describe(`hasId method of RatingRepository`, () => {
      it('should call', async () => {
        repository.hasId = jest.fn();
        await service.checkRating(ratingEntity);
        expect(repository.hasId).toHaveBeenCalledTimes(1);
      });

      it('should call with params', async () => {
        repository.hasId = jest.fn();
        await service.checkRating(ratingEntity);
        expect(repository.hasId).toHaveBeenCalledWith(ratingOrmEntity);
      });
    });

    it(`should return result of repository hasId method`, async () => {
      repository.hasId = () => true;
      const result = await service.checkRating(ratingEntity);
      expect(result).toEqual(true)
    });
  });

  describe(`saveRating method`, () => {
    beforeEach(() => {
      jest.spyOn(repository, `save`).mockImplementation(async () => ratingOrmEntity);
    });

    describe(`mapToOrmEntity method of RatingMapper`, () => {
      it('should call', async () => {
        RatingMapper.mapToOrmEntity = jest.fn(RatingMapper.mapToOrmEntity);
        await service.saveRating(ratingEntity);
        expect(RatingMapper.mapToOrmEntity).toHaveBeenCalledTimes(1);
      });

      it('should call with params', async () => {
        RatingMapper.mapToOrmEntity = jest.fn(RatingMapper.mapToOrmEntity);
        await service.saveRating(ratingEntity);
        expect(RatingMapper.mapToOrmEntity).toHaveBeenCalledWith(ratingEntity);
      });
    });

    describe(`save method of RatingRepository`, () => {
      it('should call', async () => {
        const save = jest.spyOn(repository, `save`).mockImplementation(async () => ratingOrmEntity);
        await service.saveRating(ratingEntity);
        expect(save).toHaveBeenCalledTimes(1);
      });

      it('should call with params', async () => {
        const save = jest.spyOn(repository, `save`).mockImplementation(async () => ratingOrmEntity);
        await service.saveRating(ratingEntity);
        expect(save).toHaveBeenCalledWith(ratingOrmEntity);
      });
    });

    describe(`mapToDomain method of RatingMapper`, () => {
      it('should call', async () => {
        RatingMapper.mapToDomain = jest.fn(RatingMapper.mapToDomain);
        await service.saveRating(ratingEntity);
        expect(RatingMapper.mapToDomain).toHaveBeenCalledTimes(1);
      });

      it('should call with params', async () => {
        RatingMapper.mapToDomain = jest.fn(RatingMapper.mapToDomain);
        await service.saveRating(ratingEntity);
        expect(RatingMapper.mapToDomain).toHaveBeenCalledWith(ratingOrmEntity);
      });
    });

    it(`should return result of mapToDomain`, async () => {
      RatingMapper.mapToDomain = jest.fn(RatingMapper.mapToDomain).mockReturnValueOnce(ratingEntity);
      const result = await service.saveRating(ratingEntity);
      expect(result).toBe(ratingEntity);
    })
  });

  describe(`updateRating method`, () => {
    beforeEach(() => {
      jest.spyOn(repository, `update`).mockImplementation(async () => null);
    });

    describe(`mapToOrmEntity method of RatingMapper`, () => {
      it('should call', async () => {
        RatingMapper.mapToOrmEntity = jest.fn(RatingMapper.mapToOrmEntity);
        await service.updateRating(ratingEntity);
        expect(RatingMapper.mapToOrmEntity).toHaveBeenCalledTimes(1);
      });

      it('should call with params', async () => {
        RatingMapper.mapToOrmEntity = jest.fn(RatingMapper.mapToOrmEntity);
        await service.updateRating(ratingEntity);
        expect(RatingMapper.mapToOrmEntity).toHaveBeenCalledWith(ratingEntity);
      });
    });

    describe(`update method of RatingRepository`, () => {
      it('should call', async () => {
        const update = jest.spyOn(repository, `update`).mockImplementation(async () => null);
        await service.updateRating(ratingEntity);
        expect(update).toHaveBeenCalledTimes(1);
      });

      it('should call with params', async () => {
        const update = jest.spyOn(repository, `update`).mockImplementation(async () => null);
        await service.updateRating(ratingEntity);
        expect(update).toHaveBeenCalledWith(ratingOrmEntity, ratingOrmEntity);
      });
    });

    it(`should return correct result`, async () => {
      const result = await service.updateRating(ratingEntity);
      expect(result).toBe(ratingEntity);
    });
  });
});
