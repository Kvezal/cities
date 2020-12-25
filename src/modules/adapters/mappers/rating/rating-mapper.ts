import { RatingEntity } from 'domains/entities';
import { IRatingTableParams } from 'modules/db/interfaces';


export class RatingMapper {
  static mapToDomain(tableParams: IRatingTableParams): RatingEntity {
    return RatingEntity.create({
      value: tableParams.value,
      userId: tableParams.user_id,
      hotelId: tableParams.hotel_id,
    });
  }


  static mapToTableParams(domain: RatingEntity): IRatingTableParams {
    return {
      value: domain.value,
      user_id: domain.userId,
      hotel_id: domain.hotelId,
    };
  }
}
