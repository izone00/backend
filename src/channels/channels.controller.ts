import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
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
import { SetAdminDto } from './dtos/set-admin.dto';
import { UsersService } from 'src/users/users.service';

@Controller('channels')
export class ChannelsController {
  constructor(
    private channelService: ChannelsService,
    private channelRelationService: ChannelRelationService,
    private userService: UsersService,
  ) {}

  // 채널 생성
  @Post()
  create(@Body() body: CreateChannelDto, @CurrentUser() user: User) {
    return this.channelService.create(body, user);
  }

  // 채널 필터링 조회(querystring 필요)
  @Get()
  findAll() {
    return this.channelService.findAll();
  }

  // 특정 채널 조회
  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.channelService.findOne(id);
  }

  // 채널 참여
  @Post('id')
  // guard?
  async join(
    @Param('id') id: UUID,
    @Body('password') password: string,
    @CurrentUser() user: User,
  ) {
    const channel = await this.channelService.findOne(id);
    // channel 있는지, ban당했는지, password맞는지

    return this.channelRelationService.joinChannel(channel, user);
  }

  // owner권한
  @Patch(':id')
  update(@Param('id') id: UUID, @Body() body: UpdateChannelDto) {
    // owner는 모르겟다...
    return this.channelService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.channelService.remove(id);
  }

  // owner권한
  @Patch(':channelId/admins/userId')
  setAdmain(
    @Param('channelId') channelId: UUID,
    @Param('userId') userId: UUID,
    @Body() body: SetAdminDto,
  ) {
    return this.channelRelationService.setAdmin(
      channelId,
      userId,
      body.isAdmin,
    );
  }

  // admin권한
  @Post(':channelId/ban/userId')
  async banUser(
    @Param('channelId') channelId: UUID,
    @Param('userId') userId: UUID,
  ) {
    const channel = await this.channelService.findOne(channelId);
    const user = await this.userService.findOne(userId);
    if (!channel || !user) {
      throw new NotFoundException('channel or user not found!');
    }

    return this.channelRelationService.banUser(channel, user);
  }

  @Post(':channelId/ban/userId')
  async cancelUserBanned(
    @Param('channelId') channelId: UUID,
    @Param('userId') userId: UUID,
  ) {
    return this.channelRelationService.remove.;
  }
}
