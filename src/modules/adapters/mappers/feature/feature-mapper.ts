import { FeatureEntity } from 'domains/entities';
import { IFeatureTableParams } from 'modules/db/interfaces';


export class FeatureMapper {
  static mapToDomain(tableParams: IFeatureTableParams): FeatureEntity {
    return FeatureEntity.create({
      id: tableParams.id,
      title: tableParams.title,
    });
  }

  static mapToTableParams(domain: FeatureEntity): IFeatureTableParams {
    return {
      id: domain.id,
      title: domain.title,
    };
  }
}
