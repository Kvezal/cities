import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { cityServiceSymbol, CityService } from 'domains/services';
import { CityOrmEntity, LocationOrmEntity } from 'modules/orm-entities';

import { CityAdapterService } from './city-adapter.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CityOrmEntity,
      LocationOrmEntity,
    ])
  ],
  providers: [
    {
      provide: cityServiceSymbol,
      useFactory: (cityAdapterService: CityAdapterService) => new CityService(cityAdapterService, cityAdapterService),
      inject: [CityAdapterService],
    },
  ],
  exports: [cityServiceSymbol],
})
export class CityAdapterModule {}
