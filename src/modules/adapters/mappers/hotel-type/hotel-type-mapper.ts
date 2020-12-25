import { HotelTypeEntity } from 'domains/entities';
import { IHotelTypeTableParams } from 'modules/db/interfaces';


export class HotelTypeMapper {
  static mapToDomain(tableParams: IHotelTypeTableParams): HotelTypeEntity {
    return HotelTypeEntity.create({
      id: tableParams.id,
      title: tableParams.title,
    });
  }

  static mapToTableParams(domain: HotelTypeEntity): IHotelTypeTableParams {
    return {
      id: domain.id,
      title: domain.title,
    };
  }
}
