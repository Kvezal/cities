import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { FavoriteEntity } from 'domains/entities';
import {
  FavoriteService,
  favoriteServiceSymbol,
} from 'domains/services';
import { FavoriteOutput } from 'modules/api/interfaces';


@Injectable()
export class FavoriteControllerService {
  constructor(
    @Inject(favoriteServiceSymbol) private readonly _favoriteService: FavoriteService,
  ) {}


  public async toggleFavoriteStatus(userId: string, hotelId: string): Promise<FavoriteOutput> {
    const favorite =  await this._favoriteService.toggleFavorite(userId, hotelId);
    return this.transformEntityToOutputData(favorite);
  }


  public transformEntityToOutputData(favoriteEntity: FavoriteEntity): FavoriteOutput {
    return {
      userId: favoriteEntity.userId,
      hotelId: favoriteEntity.hotelId,
      value: favoriteEntity.value,
    }
  }
}
