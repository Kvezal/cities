import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity(`hotel_types`)
export class HotelTypeOrmEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  public id: string;

  @Column()
  public title: string;
}
