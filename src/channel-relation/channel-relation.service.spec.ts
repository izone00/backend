import { Test, TestingModule } from '@nestjs/testing';
import { ChannelRelationService } from './channel-relation.service';

describe('ChannelRelationService', () => {
  let service: ChannelRelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelRelationService],
    }).compile();

    service = module.get<ChannelRelationService>(ChannelRelationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
