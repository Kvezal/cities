import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { FeatureOrmEntity } from './feature.orm-entity';
import { HotelTypeOrmEntity } from './hotel-type.orm-entity';
import { CityOrmEntity } from './city.orm-entity';
import { LocationOrmEntity } from './location.orm-entity';
import { ImageOrmEntity } from './image.orm-entity';
import { UserOrmEntity } from './user.orm-entity';
import { RatingOrmEntity } from './rating.orm-entity';


@Entity(`hotels`)
export class HotelOrmEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  public id: string;


  @Column()
  public title: string;


  @Column()
  public description: string;


  @Column()
  public bedroomCount: number;


  @Column()
  public maxAdultCount: number;


  @Column()
  public price: number;


  @Column()
  public isPremium: boolean;


  @CreateDateColumn()
  public createdAt?: Date;


  @OneToMany(
    () => RatingOrmEntity,
    (ratingOrmEntity: RatingOrmEntity) => ratingOrmEntity.hotelId
  )
  @JoinColumn()
  public rating?: number;


  @ManyToMany(
    () => FeatureOrmEntity,
    {
      eager: true,
    }
  )
  @JoinTable()
  public features: FeatureOrmEntity[];


  @ManyToOne(
    () => HotelTypeOrmEntity,
    {
      eager: true,
    }
  )
  @JoinColumn()
  public type: HotelTypeOrmEntity;


  @ManyToOne(
    () => CityOrmEntity,
    {
      onDelete: `CASCADE`,
      eager: true,
    }
  )
  @JoinColumn()
  public city: CityOrmEntity;


  @OneToOne(
    () => LocationOrmEntity,
    {
      eager: true,
    }
  )
  @JoinColumn()
  public location: LocationOrmEntity;


  @ManyToOne(
    () => UserOrmEntity,
    (userTypeOrmEntity: UserOrmEntity) => userTypeOrmEntity.id,
    {
      onDelete: `CASCADE`,
      eager: true,
    }
  )
  @JoinColumn()
  public host: UserOrmEntity;


  @ManyToMany(
    () => ImageOrmEntity,
    {
      eager: true,
    }
  )
  @JoinTable()
  public images: ImageOrmEntity[];

  @ManyToMany(
    () => UserOrmEntity
  )
  @JoinTable()
  public favorites: UserOrmEntity[];
}
