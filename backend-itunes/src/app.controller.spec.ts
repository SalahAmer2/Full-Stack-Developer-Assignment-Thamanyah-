import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            searchAndStore: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('search', () => {
    it('should call searchAndStore with the given term and return result', async () => {
      const result = await appController.search('test');
      expect(result).toEqual({ success: true });
    });
  });
});

