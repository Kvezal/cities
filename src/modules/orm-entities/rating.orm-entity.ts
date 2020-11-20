import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { UserOrmEntity } from './user.orm-entity';
import { HotelOrmEntity } from './hotel.orm-entity';


@Entity(`ratings`)
export class RatingOrmEntity {
  @ManyToOne(
    () => UserOrmEntity,
    {
      primary: true,
      cascade: [`remove`],
    }
  )
  @JoinColumn()
  public user: UserOrmEntity;

  @ManyToOne(
    () => HotelOrmEntity,
    {
      primary: true,
      cascade: [`remove`],
    }
  )
  @JoinColumn()
  public hotel: HotelOrmEntity;

  @Column()
  public value: number;
}
