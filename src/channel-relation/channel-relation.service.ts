import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelRelation } from './channel-relation.entity';
import { User } from 'src/users/users.entity';
import { Channel } from 'src/channels/channels.entity';

@Injectable()
export class ChannelRelationService {
  constructor(
    @InjectRepository(ChannelRelation)
    private repo: Repository<ChannelRelation>,
  ) {}

  async findOne(channelId: number, userId: number) {
    const relation = await this.repo.findOneBy({
      channel: { id: channelId },
      user: { id: userId },
    });
    if (!relation) throw new NotFoundException('channel-relation not found!');

    return relation;
  }

  async joinChannel(channel: Channel, user: User) {
    const channelRelation = await this.repo.findOneBy({ channel, user });
    console.log(channelRelation);
    if (channelRelation) {
      throw new BadRequestException('참여할 수 없는 유저입니다.');
    }
    const newChannelRelation = this.repo.create({
      channel,
      user,
    });

    return this.repo.save(newChannelRelation);
  }

  findAllMembers(channelId: number) {
    return this.repo.find({
      where: { channel: { id: channelId }, isBanned: false },
      order: { created_at: 'ASC' },
    });
  }

  // entity에서 owner가 채널을 나가는 예외를 처리해야한다.
  async exitChannel(channelId: number, userId: number) {
    const channelRelations = await this.findAllMembers(channelId);
    const relationToRemove = channelRelations.find(
      (rel) => rel.user.id === userId,
    );
    if (!relationToRemove || relationToRemove.isBanned) {
      throw new NotFoundException('채널에 해당 유저가 존재하지 않습니다!');
    }
    if (channelRelations.length === 1) {
      throw new InternalServerErrorException(
        '채널에는 적어도 한명의 유저가 있어야 합니다.',
      );
    }

    const newOwnerRelation = channelRelations.find(
      (rel) => rel.user.id !== userId,
    );
    console.log(newOwnerRelation);
    if (relationToRemove.isOwner) {
      await this.makeOwner(newOwnerRelation.channel, newOwnerRelation.user);
    }

    return this.repo.remove(relationToRemove);
  }

  async makeOwner(channel: Channel, user: User) {
    const newOwnerRelation = this.repo.create({
      channel,
      user,
      isOwner: true,
      isAdmin: true,
    });
    const channelRelation = await this.repo.findOneBy({ channel, user });
    if (channelRelation) {
      newOwnerRelation.id = channelRelation.id;
    }

    const prevOwnerRelation = await this.repo.findOneBy({
      channel,
      isOwner: true,
    });
    if (prevOwnerRelation) {
      prevOwnerRelation.isOwner = false;
      prevOwnerRelation.isAdmin = false;
      return this.repo.save([newOwnerRelation, prevOwnerRelation]);
    }

    return this.repo.save(newOwnerRelation);
  }

  async setAdmin(channelId: number, userId: number, isAdmin: boolean) {
    const channelRelation = await this.findOne(channelId, userId);
    if (channelRelation.isBanned || channelRelation.isOwner) {
      throw new BadRequestException('admin권한을 변경할 수 없는 유저입니다!');
    }
    channelRelation.isAdmin = isAdmin;

    return this.repo.save(channelRelation);
  }

  async banUser(channel: Channel, user: User) {
    const channelRelation = await this.repo.findOneBy({ channel, user });
    if (channelRelation?.isOwner) {
      throw new InternalServerErrorException('owner는 ban할 수 없습니다.');
    }

    const banRelation = this.repo.create({
      channel,
      user,
      isBanned: true,
    });
    if (channelRelation) {
      banRelation.id = channelRelation.id;
    }

    return this.repo.save(banRelation);
  }

  cancleUserBanned(relation: ChannelRelation) {
    if (relation.isBanned === false) {
      throw new InternalServerErrorException(
        'ban당한 유저에만 수행할 수 있습니다.',
      );
    }

    return this.repo.remove(relation);
  }

  findAllBanned(channelId: number) {
    return this.repo.findBy({ channel: { id: channelId }, isBanned: true });
  }
}
