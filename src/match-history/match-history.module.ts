import { Module } from '@nestjs/common';
import { MatchHistoryService } from './match-history.service';

@Module({
  providers: [MatchHistoryService]
})
export class MatchHistoryModule {}
