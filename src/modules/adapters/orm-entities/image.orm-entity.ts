import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity(`images`)
export class ImageOrmEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  public id: string;

  @Column()
  title: string;
}
