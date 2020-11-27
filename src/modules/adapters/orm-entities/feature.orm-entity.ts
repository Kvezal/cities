import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity(`features`)
export class FeatureOrmEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  public id: string;

  @Column()
  public title: string;
}
