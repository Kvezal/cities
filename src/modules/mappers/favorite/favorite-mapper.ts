import { FavoriteEntity } from 'domains/entities';
import { FavoriteOrmEntity } from 'modules/orm-entities';


export class FavoriteMapper {
  static mapToDomain(ormEntity: FavoriteOrmEntity): FavoriteEntity {
    return FavoriteEntity.create({
      value: ormEntity.value,
      userId: ormEntity.user,
      hotelId: ormEntity.hotel,
    });
  }

  static mapToOrmEntity(domain: FavoriteEntity): FavoriteOrmEntity {
    const ormEntity = new FavoriteOrmEntity();
    ormEntity.value = domain.value;
    ormEntity.user = domain.userId;
    ormEntity.hotel = domain.hotelId;
    return ormEntity;
  }
}
