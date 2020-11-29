import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityOrmEntity } from './city.orm-entity';
import { CommentOrmEntity } from './comment.orm-entity';
import { FavoriteOrmEntity } from './favorite.orm-entity';
import { FeatureOrmEntity } from './feature.orm-entity';
import { HotelOrmEntity } from './hotel.orm-entity';
import { HotelTypeOrmEntity } from './hotel-type.orm-entity';
import { ImageOrmEntity } from './image.orm-entity';
import { JsonWebTokenOrmEntity } from './json-web-token.orm-entity';
import { LocationOrmEntity } from './location.orm-entity';
import { RatingOrmEntity } from './rating.orm-entity';
import { UserOrmEntity } from './user.orm-entity';
import { UserTypeOrmEntity } from './user-type.orm-entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CityOrmEntity,
      CommentOrmEntity,
      FavoriteOrmEntity,
      FeatureOrmEntity,
      HotelOrmEntity,
      HotelTypeOrmEntity,
      ImageOrmEntity,
      JsonWebTokenOrmEntity,
      LocationOrmEntity,
      RatingOrmEntity,
      UserOrmEntity,
      UserTypeOrmEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class OrmEntitiesModule {}
