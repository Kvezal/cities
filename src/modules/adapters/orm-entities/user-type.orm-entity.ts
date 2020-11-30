import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity(`user_types`)
export class UserTypeOrmEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  public id: string;

  @Column()
  public title: string;
}
