import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { ImageOrmEntity } from './image.orm-entity';
import { UserTypeOrmEntity } from './user-type.orm-entity';


@Entity(`users`)
export class UserOrmEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @OneToOne(
    () => ImageOrmEntity,
    {
      eager: true
    }
  )
  @JoinColumn()
  public image: ImageOrmEntity;

  @ManyToOne(
    () => UserTypeOrmEntity,
    {
      eager: true,
    }
  )
  public type: UserTypeOrmEntity;
}


