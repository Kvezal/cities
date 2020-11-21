import { FavoriteEntity } from 'domains/entities';
import { FavoriteOrmEntity } from 'modules/orm-entities';


export class FavoriteMapper {
  static mapToDomain(ormEntity: FavoriteOrmEntity): FavoriteEntity {
    return FavoriteEntity.create({
      value: ormEntity.value,
      userId: ormEntity.userId,
      hotelId: ormEntity.hotelId,
    });
  }

  static mapToOrmEntity(domain: FavoriteEntity): FavoriteOrmEntity {
    const ormEntity = new FavoriteOrmEntity();
    ormEntity.value = domain.value;
    ormEntity.userId = domain.userId;
    ormEntity.hotelId = domain.hotelId;
    return ormEntity;
  }
}
