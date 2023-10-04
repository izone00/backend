import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decoraor';
import { User } from 'src/users/users.entity';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { UpdateChannelDto } from './dtos/update-channel.dto';
import { ChannelRelationService } from 'src/channel-relation/channel-relation.service';
import { UUID } from 'crypto';

@Controller('channels')
export class ChannelsController {
  constructor(
    private channelService: ChannelsService,
    private channelRelationService: ChannelRelationService,
  ) {}

  // querystring으로 filter?
  @Get()
  findAll() {
    return this.channelService.findAll();
  }

  @Post()
  create(@Body() body: CreateChannelDto, @CurrentUser() user: User) {
    return this.channelService.create(body, user);
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.channelService.findOne(id);
  }

  @Post('id')
  // guard?
  async join(
    @Param('id') id: UUID,
    @Body('password') password: string,
    @CurrentUser() user: User,
  ) {
    const channel = await this.channelService.findOne(id);
    // channel 있는지, ban당했는지, password맞는지

    return this.channelRelationService.create(
      { is_owner: false, is_admin: false, is_banned: false },
      channel,
      user,
    );
  }

  // guard?
  @Put(':id')
  update(@Param('id') id: UUID, @Body() body: UpdateChannelDto) {
    // owner는 모르겟다...
    return this.channelService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.channelService.remove(id);
  }
}
