import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ChannelsController } from './channels/channels.controller';
import { FriendsController } from './friends.controller';

@Module({
  providers: [FriendsService],
  controllers: [ChannelsController, FriendsController]
})
export class FriendsModule {}
