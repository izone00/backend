import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserRelStatus } from 'src/user-relation/user-relation.enum';
import { UserRelationService } from 'src/user-relation/user-relation.service';
import { CurrentUser } from 'src/users/decorators/current-user.decoraor';
import { UsersService } from 'src/users/users.service';

@Controller('friends')
export class FriendsController {
  constructor(
    private userRelService: UserRelationService,
    private usersService: UsersService,
  ) {}

  @Post(':userId')
  // userBlockGuard
  async makeFriend(
    @CurrentUser() userId: number,
    @Param('userId', ParseIntPipe) oppenseId: number,
  ) {
    const user = await this.usersService.findOne(userId, {
      relations: { userRelations: true },
    });
    const oppense = await this.usersService.findOne(oppenseId, {
      relations: { userRelations: true },
    });
    console.log(user);
    const relationByUser = user.userRelations.find(
      (rel) => rel.oppense.id === oppenseId,
    );
    const relationByOppense = oppense.userRelations.find(
      (rel) => rel.oppense.id === userId,
    );

    console.log(relationByUser);

    let userRelation;
    if (!relationByOppense) {
      userRelation = await this.userRelService.requestFriend(user, oppense);
    } else if (
      relationByUser.status === UserRelStatus.friendRequest &&
      relationByOppense.status === UserRelStatus.pendingApproval
    ) {
      userRelation = await this.userRelService.acceptFriend(
        relationByUser,
        relationByOppense,
      );
    } else {
      throw new BadRequestException('잘못된 친구 신청입니다.');
    }

    return userRelation;
  }

  @Get()
  findAllFriends(@CurrentUser() userId: number) {
    return this.userRelService.findAll(userId, UserRelStatus.friend);
  }

  @Delete(':userId')
  async removeFriend(
    @CurrentUser() userId: number,
    @Param('userId') oppenseId: number,
  ) {
    return this.userRelService.removeFriendship(userId, oppenseId);
  }
}
