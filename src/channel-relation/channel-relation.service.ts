import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelRelation } from './channel-relation.entity';
import { User } from 'src/users/users.entity';
import { Channel } from 'src/channels/channels.entity';
import { UUID } from 'crypto';

@Injectable()
export class ChannelRelationService {
  constructor(
    @InjectRepository(ChannelRelation)
    private repo: Repository<ChannelRelation>,
  ) {}

  createOwner(channel: Channel, user: User) {
    const channelRelation = this.repo.create({
      channel,
      user,
      isOwner: true,
      isAdmin: true,
    });

    return this.repo.save(channelRelation);
  }

  findAll(channel: Channel) {
    // 정렬 해야함
    return this.repo.find({ where: { channel, inBanned: false } });
  }

  async joinChannel(channel: Channel, user: User) {
    const channelRelation = this.repo.create({
      channel,
      user,
    });

    return this.repo.save(channelRelation);
  }

  async setAdmin(channelId: UUID, userId: UUID, isAdmin: boolean) {
    const channelRelation = await this.repo.findOneBy({
      channel: { id: channelId },
      user: { id: userId },
    });
    if (!channelRelation) {
      throw new NotFoundException('channel-relation not found!');
    }
    channelRelation.isAdmin = isAdmin;
    return this.repo.save(channelRelation);
  }

  banUser(channel: Channel, user: User) {
    const channelRelaion = this.repo.create({
      channel,
      user,
      isAdmin: false,
      inBanned: true,
    });

    return this.repo.save(channelRelaion);
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
