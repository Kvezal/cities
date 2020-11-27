import { FeatureEntity } from 'domains/entities';

import { FeatureOrmEntity } from '../../orm-entities';


export class FeatureMapper {
  static mapToDomain(ormEntity: FeatureOrmEntity): FeatureEntity {
    return FeatureEntity.create({
      id: ormEntity.id,
      title: ormEntity.title,
    });
  }

  static mapToOrmEntity(domain: FeatureEntity): FeatureOrmEntity {
    const ormEntity = new FeatureOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.title = domain.title;
    return ormEntity;
  }
}
