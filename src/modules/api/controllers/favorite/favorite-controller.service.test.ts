import { Test, TestingModule } from '@nestjs/testing';

import { authServiceSymbol, favoriteServiceSymbol } from 'domains/services';

import { FavoriteControllerService } from './favorite-controller.service';


describe('FavoriteControllerService', () => {
  let service: FavoriteControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteControllerService,
        {
          provide: favoriteServiceSymbol,
          useValue: {},
        },
        {
          provide: authServiceSymbol,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FavoriteControllerService>(FavoriteControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
