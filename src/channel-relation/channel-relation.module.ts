import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelRelation } from './channel-relation.entity';
import { ChannelRelationService } from './channel-relation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelRelation])],
  providers: [ChannelRelationService],
  exports: [ChannelRelationService],
})
export class ChannelRelationModule {}
