import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channels.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
