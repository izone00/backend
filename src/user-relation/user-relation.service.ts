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

@Injectable()
export class UserRelationService {
  constructor(
    @InjectRepository(UserRelation) private repo: Repository<UserRelation>,
  ) {}

  friendRelations = [
    UserRelStatus.friend,
    UserRelStatus.friendRequest,
    UserRelStatus.pendingApproval,
  ];

  findAll(userId: number, status: UserRelStatus) {
    return this.repo.find({ where: { user: { id: userId }, status } });
  }

  findOne(userid: number, oppenseId: number) {
    const userRelation = this.repo.findOneBy({
      user: { id: userid },
      oppense: { id: oppenseId },
    });
    if (!userRelation) {
      throw new NotFoundException('user-relation not found!');
    }

    return userRelation;
  }

  remove(userRelation: UserRelation) {
    if (this.friendRelations.includes(userRelation.status))
      throw new BadRequestException('친구 관계를 한쪽만 지울수 없습니다!');

    return this.repo.remove(userRelation);
  }

  // 친구 관계
  requestFriend(sender: User, receiver: User) {
    const senderRel = this.repo.create({
      user: sender,
      oppense: receiver,
      status: UserRelStatus.pendingApproval,
    });
    const receiverRel = this.repo.create({
      user: receiver,
      oppense: sender,
      status: UserRelStatus.friendRequest,
    });

    return this.repo.save([senderRel, receiverRel]);
  }

  acceptFriend(userRel: UserRelation, oppenseRel: UserRelation) {
    if (
      userRel.oppense.id !== oppenseRel.user.id ||
      oppenseRel.oppense.id !== userRel.user.id
    ) {
      throw new BadRequestException('잘못된 친구 관계입니다!');
    }

    userRel.status = UserRelStatus.friend;
    oppenseRel.status = UserRelStatus.friend;

    return this.repo.save([userRel, oppenseRel]);
  }

  async removeFriendship(userId: number, oppenseId: number) {
    const userRel = await this.findOne(userId, oppenseId);
    const oppenseRel = await this.findOne(oppenseId, userId);
    if (
      !this.friendRelations.includes(userRel.status) ||
      !this.friendRelations.includes(oppenseRel.status)
    ) {
      throw new BadRequestException('친구 사이가 아닙니다!');
    }

    return this.repo.remove([userRel, oppenseRel]);
  }

  // 차단 관계
  async blockUser(user: User, oppense: User) {
    const relationByOppense = await this.findOne(oppense.id, user.id);
    if (this.friendRelations.includes(relationByOppense.status)) {
      await this.repo.remove(relationByOppense);
    }

    const blockRelation = this.repo.create({
      user,
      oppense,
      status: UserRelStatus.block,
    });

    return this.repo.save(blockRelation);
  }
}
