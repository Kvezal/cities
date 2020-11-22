import { RatingEntity } from 'domains/entities';
import { RatingOrmEntity } from 'modules/orm-entities';


export class RatingMapper {
  static mapToDomain(ormEntity: RatingOrmEntity): RatingEntity {
    return RatingEntity.create({
      userId: ormEntity.userId,
      hotelId: ormEntity.hotelId,
      value: ormEntity.value,
    });
  }

  static mapToOrmEntity(domain: RatingEntity): RatingOrmEntity {
    const ormEntity = new RatingOrmEntity();
    ormEntity.userId = domain.userId;
    ormEntity.hotelId = domain.hotelId;
    ormEntity.value = domain.value;
    return ormEntity;
  }
}
