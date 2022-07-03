import { Test, TestingModule } from '@nestjs/testing';
import { TypeormOptionsFactoryService } from './typeorm-options-factory.service';

describe('TypeormOptionsFactoryService', () => {
  let service: TypeormOptionsFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeormOptionsFactoryService],
    }).compile();

    service = module.get<TypeormOptionsFactoryService>(
      TypeormOptionsFactoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
