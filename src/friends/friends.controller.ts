import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UUID } from 'crypto';
import { UserRelStatus } from 'src/user-relation/user-relation.enum';
import { UserRelationService } from 'src/user-relation/user-relation.service';
import { CurrentUser } from 'src/users/decorators/current-user.decoraor';

@Controller('friends')
export class FriendsController {
  constructor(private userRelService: UserRelationService) {}

  @Get()
  findAll(@CurrentUser() user: UUID) {
    return user.userRelations.filter(
      (rel) => rel.status === UserRelStatus.friend,
    );
  }

  @Post(':userId')
  makeFriend(@CurrentUser() userId: UUID, @Param('userId') oppenseId: UUID) {
    const relationByUser = this.userRelService.findOne(userId, oppenseId);
    const relationByOppense = this.userRelService.findOne(oppenseId, userId);
    if (!relationByUser && !relationByOppense) {
      this.userRelService.create(
        userId,
        oppenseId,
        UserRelStatus.pendingApproval,
        );
        this.userRelService.create(
          oppenseId,
          userId,
          UserRelStatus.friendRequest,
      );
    } else if ()
  }

  @Delete(':userId')
  removeFriend(@CurrentUser() userId: UUID, @Param('userId') oppenseId: UUID) {
    return this.userRelService.remove(userId, oppenseId, UserRelStatus.friend);
  }
}
