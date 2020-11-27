import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { LocationOrmEntity } from './location.orm-entity';


@Entity(`cities`)
export class CityOrmEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  public id: string;

  @Column()
  public title: string;

  @OneToOne(
    () => LocationOrmEntity,
    {
      cascade: [`update`, `remove`],
      eager: true,
    }
  )
  @JoinColumn()
  public location: LocationOrmEntity;
}
