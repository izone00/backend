import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channels.entity';
import { ChannelRelationModule } from 'src/channel-relation/channel-relation.module';
import { ChannelRelation } from 'src/channel-relation/channel-relation.entity';
import { ChannelRelationService } from 'src/channel-relation/channel-relation.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel, ChannelRelation]),
    ChannelRelationModule,
    UsersModule,
  ],
  providers: [ChannelsService, ChannelRelationService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
