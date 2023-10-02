import { Module } from '@nestjs/common';
import { ChannelMembersService } from './channel-members.service';

@Module({
  providers: [ChannelMembersService]
})
export class ChannelMembersModule {}
