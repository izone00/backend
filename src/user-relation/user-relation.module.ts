import { Module } from '@nestjs/common';
import { UserRelationService } from './user-relation.service';

@Module({
  providers: [UserRelationService]
})
export class UserRelationModule {}
