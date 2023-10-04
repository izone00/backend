import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelRelDto } from './dtos/create-channel-relation.dto';
import { Channel } from 'src/channels/channels.entity';
import { User } from 'src/users/users.entity';
import { ChannelRelation } from './channel-relation.entity';
import { UUID } from 'crypto';

@Injectable()
export class ChannelRelationService {
  constructor(
    @InjectRepository(ChannelRelation)
    private repo: Repository<ChannelRelation>,
  ) {}

  create(
    createChannelRelDto: CreateChannelRelDto,
    channel: Channel,
    user: User,
  ) {
    const channelRel = this.repo.create({
      ...createChannelRelDto,
      user,
      channel,
    });

    return this.repo.save(channelRel);
  }

  findAll() {
    return `This action returns all hi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hi`;
  }

  update(id: number) {
    return `This action updates a #${id} hi`;
  }

  async remove(idChannel: UUID, idUser: UUID) {
    const channelRel = await this.repo.find({
      where: { channel: { id: idChannel }, user: { id: idUser } },
    });
    if (channelRel.length === 0) {
      throw new NotFoundException(
        '지우고자 하는 channelRelation이 존재하지 않습니다.',
      );
    }
    return this.repo.remove(channelRel);
  }
}
