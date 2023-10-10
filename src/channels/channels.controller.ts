import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decoraor';
import { User } from 'src/users/users.entity';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { UpdateChannelDto } from './dtos/update-channel.dto';
import { ChannelRelationService } from 'src/channel-relation/channel-relation.service';
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
  createChannel(@Body() body: CreateChannelDto, @CurrentUser() user: User) {
    return this.channelService.create(body, user);
  }

  // 채널 필터링 조회(querystring 필요)
  @Get()
  findAllChannel() {
    return this.channelService.findAll();
  }

  // 특정 채널 조회
  @Get(':id')
  findOneChannel(@Param('id') id: number) {
    return this.channelService.findOne(id);
  }

  // 채널 참여
  @Post('id')
  // guard?
  async joinChannel(
    @Param('id') id: number,
    @Body('password') password: string,
    @CurrentUser() user: User,
  ) {
    const channel = await this.channelService.findOne(id);
    // channel 있는지, ban당했는지, password맞는지
    // 초대받은 대상인지
    return this.channelRelationService.joinChannel(channel, user);
  }

  // 채널 나가기
  @Delete(':id')
  removeChannel(@Param('id') id: number) {
    return this.channelService.remove(id);
  }

  // 채널 정보 수정
  @Put(':id')
  // ownerGuard
  updateChannel(@Param('id') id: number, @Body() body: UpdateChannelDto) {
    // owner는 모르겟다...
    return this.channelService.update(id, body);
  }

  // admin권한 부여 및 해지
  @Put(':channelId/admins/userId')
  // ownerGuard
  setAdmain(
    @Param('channelId') channelId: number,
    @Param('userId') userId: number,
    @Body() body: { isAdmin: boolean },
  ) {
    return this.channelRelationService.setAdmin(
      channelId,
      userId,
      body.isAdmin,
    );
  }

  // 유저 ban
  @Post(':channelId/ban/userId')
  // adminGuard
  async banUser(
    @Param('channelId') channelId: number,
    @Param('userId') userId: number,
  ) {
    const channel = await this.channelService.findOne(channelId);
    const user = await this.userService.findOne(userId);
    if (!channel || !user) {
      throw new NotFoundException('channel or user not found!');
    }

    return this.channelRelationService.banUser(channel, user);
  }

  // 유저 ban 해지
  @Delete(':channelId/ban/userId')
  // adminGuard
  async cancelUserBanned(
    @Param('channelId') channelId: number,
    @Param('userId') userId: number,
  ) {
    return this.channelRelationService.remove;
  }
}
