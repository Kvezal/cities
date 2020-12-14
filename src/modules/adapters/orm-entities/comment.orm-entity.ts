import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { UserOrmEntity } from './user.orm-entity';
import { HotelOrmEntity } from './hotel.orm-entity';


@Entity(`comments`)
export class CommentOrmEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  public id?: string;

  @Column()
  public text: string;

  @CreateDateColumn()
  public createdAt?: Date;

  @ManyToOne(
    () => UserOrmEntity,
    {
      eager: true,
      cascade: [`remove`],
    }
  )
  @JoinColumn()
  public user: UserOrmEntity;

  @ManyToOne(
    () => HotelOrmEntity,
    {
      eager: true,
      cascade: [`remove`],
    }
  )
  @JoinColumn()
  public hotel: HotelOrmEntity;

  public rating?: number;
}
