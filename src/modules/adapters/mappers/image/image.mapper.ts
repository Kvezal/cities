import { ImageEntity } from 'domains/entities';
import { IImageTableParams } from 'modules/db/interfaces';


export class ImageMapper {
  static mapToDomain(tableParams: IImageTableParams): ImageEntity {
    return ImageEntity.create({
      id: tableParams.id,
      title: tableParams.title,
    });
  }

  static mapToTableParams(domain: ImageEntity): IImageTableParams {
    return {
      id: domain.id,
      title: domain.title,
    };
  }
}
