import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { HotelOrmEntity } from './hotel.orm-entity';
import { UserOrmEntity } from './user.orm-entity';


@Entity(`favorites`)
export class FavoriteOrmEntity {
  @ManyToOne(
    () => UserOrmEntity,
    (userOrmEntity: UserOrmEntity) => userOrmEntity.id,
    {
      primary: true,
      eager: true,
      cascade: [`update`, `remove`],
    }
  )
  @JoinColumn({
    name: `userId`,
    referencedColumnName: `id`,
  })
  public userId: string;

  @ManyToOne(
    () => HotelOrmEntity,
    {
      primary: true,
      eager: true,
      cascade: [`update`, `remove`],
    }
  )
  @JoinColumn({
    name: `hotelId`,
    referencedColumnName: `id`,
  })
  public hotelId: string;

  public value?: boolean = true;
}
