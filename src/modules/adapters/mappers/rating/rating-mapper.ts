import { RatingEntity } from 'domains/entities';

import { RatingOrmEntity } from '../../orm-entities';


export class RatingMapper {
  static mapToDomain(ormEntity: RatingOrmEntity): RatingEntity {
    return RatingEntity.create({
      value: ormEntity.value,
      userId: ormEntity.userId,
      hotelId: ormEntity.hotelId,
    });
  }

  static mapToOrmEntity(domain: RatingEntity): RatingOrmEntity {
    const ormEntity = new RatingOrmEntity();
    ormEntity.value = domain.value;
    ormEntity.userId = domain.userId;
    ormEntity.hotelId = domain.hotelId;
    return ormEntity;
  }
}
