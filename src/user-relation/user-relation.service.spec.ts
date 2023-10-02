import { Test, TestingModule } from '@nestjs/testing';
import { UserRelationService } from './user-relation.service';

describe('UserRelationService', () => {
  let service: UserRelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRelationService],
    }).compile();

    service = module.get<UserRelationService>(UserRelationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
