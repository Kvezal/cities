import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { UserOrmEntity } from './user.orm-entity';
import { HotelOrmEntity } from './hotel.orm-entity';


@Entity(`ratings`)
export class RatingOrmEntity {
  @ManyToOne(
    () => UserOrmEntity,
    {
      primary: true,
      eager: true,
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
      eager: true,
      cascade: [`remove`],
    }
  )
  @JoinColumn({
    name: `hotelId`,
    referencedColumnName: `id`,
  })
  public hotelId: string;

  @Column()
  public value: number;
}
