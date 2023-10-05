import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRelation } from './user-relation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UserRelStatus } from './user-relation.enum';
import { UUID } from 'crypto';

@Injectable()
export class UserRelationService {
  constructor(
    @InjectRepository(UserRelation) private repo: Repository<UserRelation>,
  ) {}

  findAll(user: User, status: UserRelStatus) {
    return this.repo.find({ where: { user, status } });
  }

  findOne(userid: UUID, oppenseId: UUID) {
    return this.repo.findOneBy({
      user: { id: userid },
      oppense: { id: oppenseId },
    });
  }

  // 친구 관계
  sendFriendReq(sender: User, receiver: User) {
    const userRelations = this.repo.create([
      {
        user: sender,
        oppense: receiver,
        status: UserRelStatus.pendingApproval,
      },
      { user: receiver, oppense: sender, status: UserRelStatus.friendRequest },
    ]);

    return this.repo.save(userRelations);
  }

  // acceptFrienReq(sender: User, receiver: User) {
  //   const senderRelation = this.repo.update
  // }

  // 차단 관계
  createBlock(user: User, oppense: User) {
    const blockRelation = this.repo.create({
      user,
      oppense,
      status: UserRelStatus.block,
    });

    return this.repo.save(blockRelation);
  }

  create(userId: UUID, oppenseId: UUID, status: UserRelStatus) {
    const relation = this.repo.create({
      user: { id: userId },
      oppense: { id: oppenseId },
      status,
    });

    return this.repo.save(relation);
  }

  async remove(userId: UUID, oppenseId: UUID, status: UserRelStatus) {
    const relation = await this.repo.findOneBy({
      user: { id: userId },
      oppense: { id: oppenseId },
    });
    if (!relation) {
      throw new NotFoundException('user-relation not found!');
    } else if (relation.status !== status) {
      throw new BadRequestException('relation is not friend!');
    }

    return this.repo.remove(relation);
  }
}
