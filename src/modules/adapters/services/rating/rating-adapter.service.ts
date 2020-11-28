import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from 'domains/entities';
import { CheckRatingPort, SaveRatingPort, UpdateRatingPort } from 'domains/ports';

import { RatingOrmEntity } from '../../orm-entities';
import { RatingMapper } from '../../mappers';


export class RatingAdapterService implements
  SaveRatingPort,
  UpdateRatingPort,
  CheckRatingPort {
  constructor(
    @InjectRepository(RatingOrmEntity) private readonly _ratingRepository: Repository<RatingOrmEntity>
  ) {}

  public async checkRating(entity: RatingEntity): Promise<boolean> {
    const ormEntity: RatingOrmEntity = RatingMapper.mapToOrmEntity(entity);
    return this._ratingRepository.hasId(ormEntity);
  }

  public async saveRating(entity: RatingEntity): Promise<RatingEntity> {
    const ormEntity: RatingOrmEntity = RatingMapper.mapToOrmEntity(entity);
    const savedOrmEntity = await this._ratingRepository.save(ormEntity);
    return RatingMapper.mapToDomain(savedOrmEntity);
  }

  public async updateRating(entity: RatingEntity): Promise<RatingEntity> {
    const ormEntity: RatingOrmEntity = RatingMapper.mapToOrmEntity(entity);
    await this._ratingRepository.update(ormEntity, ormEntity);
    return entity;
  }
}
