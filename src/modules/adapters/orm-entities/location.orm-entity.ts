import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity(`locations`)
export class LocationOrmEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  public id: string;

  @Column({
    type: 'float',
  })
  public latitude: number;

  @Column({
    type: 'float',
  })
  public longitude: number;

  @Column()
  public zoom: number;
}
