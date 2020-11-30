import { ImageEntity } from 'domains/entities';

import { ImageOrmEntity } from '../../orm-entities';


export class ImageMapper {
  static mapToDomain(ormEntity: ImageOrmEntity): ImageEntity {
    return ImageEntity.create({
      id: ormEntity.id,
      title: ormEntity.title,
    });
  }

  static mapToOrmEntity(domain: ImageEntity): ImageOrmEntity {
    const ormEntity = new ImageOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.title = domain.title;
    return ormEntity;
  }
}
