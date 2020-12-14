import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { CityEntity } from 'domains/entities';
import {
  CityService,
  cityServiceSymbol,
} from 'domains/services';
import { CityOutput } from 'modules/api/interfaces';


@Injectable()
export class CityControllerService {
  constructor(
    @Inject(cityServiceSymbol) private readonly _cityService: CityService
  ) {}

  public async getCityList(): Promise<CityOutput[]> {
    const cityEntities: CityEntity[] = await this._cityService.getCityList();
    return cityEntities.map((cityEntity: CityEntity) => this.transformEntityToOutputData(cityEntity));
  }

  public transformEntityToOutputData(cityEntity): CityOutput {
    return {
      id: cityEntity.id,
      title: cityEntity.title,
      location: {
        id: cityEntity.location.id,
        latitude: cityEntity.location.latitude,
        longitude: cityEntity.location.longitude,
        zoom: cityEntity.location.zoom,
      }
    };
  }
}
