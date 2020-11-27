import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { UserOrmEntity } from './user.orm-entity';
import { HotelOrmEntity } from './hotel.orm-entity';


@Entity(`ratings`)
export class RatingOrmEntity {
  @Column()
  public value: number;

  @ManyToOne(
    () => UserOrmEntity,
    {
      primary: true,
      cascade: [`remove`],
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
      cascade: [`remove`],
    }
  )
  @JoinColumn({
    name: `hotelId`,
    referencedColumnName: `id`,
  })
  public hotelId: string;
}
