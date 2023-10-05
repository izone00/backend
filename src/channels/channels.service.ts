import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './channels.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { UpdateChannelDto } from './dtos/update-channel.dto';
import { UUID } from 'crypto';
import { ChannelRelationService } from 'src/channel-relation/channel-relation.service';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel) private repo: Repository<Channel>,
    private channelRelService: ChannelRelationService,
  ) {}

  async create(createChannelDto: CreateChannelDto, owner: User) {
    const channel = this.repo.create({ ...createChannelDto, owner });
    const channelRel = await this.channelRelService.createOwner(channel, owner);

    return this.repo.save(channel); // save에 실패한경우 channelRel을 삭제해야한다!
  }

  findAll() {
    return this.repo.find({ where: { isPrivate: false } });
  }

  findOne(id: UUID) {
    return this.repo.findOneBy({ id });
  }

  async update(id: UUID, updateChannelDto: UpdateChannelDto) {
    const channel = await this.repo.findOneBy({ id });
    if (!channel) {
      throw new NotFoundException('channel not found');
    }
    Object.assign(channel, updateChannelDto);
    return this.repo.save(channel);
  }

  async remove(id: UUID) {
    const channel = await this.repo.findOneBy({ id });
    if (!channel) {
      throw new NotFoundException('channel not found');
    }
    return this.repo.remove(channel);
  }
}
