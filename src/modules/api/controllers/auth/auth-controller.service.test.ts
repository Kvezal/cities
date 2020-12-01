import { Test, TestingModule } from '@nestjs/testing';

import { AuthControllerService } from './auth-controller.service';


describe('AuthControllerService', () => {
  let service: AuthControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthControllerService],
    }).compile();

    service = module.get<AuthControllerService>(AuthControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
