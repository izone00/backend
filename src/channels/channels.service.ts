import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './channels.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { UpdateChannelDto } from './dtos/update-channel.dto';
import { UUID } from 'crypto';

@Injectable()
export class ChannelsService {
  constructor(@InjectRepository(Channel) private repo: Repository<Channel>) {}

  create(createChannelDto: CreateChannelDto, owner: User) {
    const channel = this.repo.create({ ...createChannelDto, owner });

    return this.repo.save(channel);
  }

  findAll() {
    return this.repo.find({ where: { is_private: false } });
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
