import { Test, TestingModule } from '@nestjs/testing';

import { CommentControllerService } from './comment-controller.service';
import { authServiceSymbol, commentServiceSymbol } from 'domains/services';


describe('CommentControllerService', () => {
  let service: CommentControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentControllerService,
        {
          provide: commentServiceSymbol,
          useValue: {},
        },
        {
          provide: authServiceSymbol,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CommentControllerService>(CommentControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
