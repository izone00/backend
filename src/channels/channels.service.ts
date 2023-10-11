import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './channels.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { UpdateChannelDto } from './dtos/update-channel.dto';
import { ChannelRelationService } from 'src/channel-relation/channel-relation.service';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel) private repo: Repository<Channel>,
    private channelRelService: ChannelRelationService,
  ) {}

  async createChannel(createChannelDto: CreateChannelDto, owner: User) {
    const channel = this.repo.create({ ...createChannelDto, owner });
    const savedChannel = await this.repo.save(channel);
    try {
      await this.channelRelService.makeOwner(channel, owner);
    } catch {
      this.remove(savedChannel.id);
    }

    return savedChannel;
  }

  findAllChannels() {
    return this.repo.find();
  }

  findOneChannel(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateChannelDto: UpdateChannelDto) {
    const channel = await this.repo.findOneBy({ id });
    if (!channel) {
      throw new NotFoundException('channel not found');
    }
    Object.assign(channel, updateChannelDto);
    return this.repo.save(channel);
  }

  async remove(id: number) {
    const channel = await this.findOneChannel(id);
    if (!channel) {
      throw new NotFoundException('channel not found');
    }
    // cascade를 이용해 channelRelations모두 삭제
    return this.repo.remove(channel);
  }
}
