import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { HotelOrmEntity } from './hotel.orm-entity';
import { UserOrmEntity } from './user.orm-entity';


@Entity(`favorites`)
export class FavoriteOrmEntity {
  @ManyToOne(
    () => UserOrmEntity,
    {
      primary: true,
    }
  )
  @JoinColumn()
  public user: string;

  @ManyToOne(
    () => HotelOrmEntity,
    {
      primary: true,
    }
  )
  @JoinColumn()
  public hotel: string;

  public value = true;
}
