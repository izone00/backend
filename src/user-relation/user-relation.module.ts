import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRelation } from './user-relation.entity';
import { UserRelationService } from './user-relation.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRelation])],
  providers: [UserRelationService],
  exports: [UserRelationService, TypeOrmModule],
})
export class UserRelationModule {}
