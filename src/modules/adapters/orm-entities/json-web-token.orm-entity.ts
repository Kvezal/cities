import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity(`refresh_tokens`)
export class JsonWebTokenOrmEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public token: string

  @CreateDateColumn()
  public createdAt?: Date;
}
