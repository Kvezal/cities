import { Test, TestingModule } from '@nestjs/testing';

import { authServiceSymbol } from 'domains/services';

import { AuthControllerService } from './auth-controller.service';


describe('AuthControllerService', () => {
  let service: AuthControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthControllerService,
        {
          provide: authServiceSymbol,
          useValue: {
            authenticateUser: async () => null,
            checkAccessToken: async () => null,
            decodeAccessToken: async () => null,
            refreshToken: async () => null,
          },
        },
      ],
    }).compile();

    service = module.get<AuthControllerService>(AuthControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
