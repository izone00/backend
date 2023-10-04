import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channels.entity';
import { ChannelRelationModule } from 'src/channel-relation/channel-relation.module';
import { ChannelRelationService } from 'src/channel-relation/channel-relation.service';
import { ChannelRelation } from 'src/channel-relation/channel-relation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel, ChannelRelation]),
    ChannelRelationModule,
  ],
  providers: [ChannelsService, ChannelRelationService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
