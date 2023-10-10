import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UserRelStatus } from 'src/user-relation/user-relation.enum';
import { UserRelationService } from 'src/user-relation/user-relation.service';
import { CurrentUser } from 'src/users/decorators/current-user.decoraor';
import { UsersService } from 'src/users/users.service';

@Controller('blocks')
export class BlocksController {
  constructor(
    private userRelService: UserRelationService,
    private usersService: UsersService,
  ) {}

  @Post(':userId')
  async blockUser(
    @CurrentUser() userId: number,
    @Param('userId') oppenseId: number,
  ) {
    const user = await this.usersService.findOne(userId);
    const oppense = await this.usersService.findOne(oppenseId);

    return this.userRelService.blockUser(user, oppense);
  }

  @Get()
  findAllBlocks(@CurrentUser() userId: number) {
    return this.userRelService.findAll(userId, UserRelStatus.block);
  }

  @Delete(':userId')
  async cancleBlock(
    @CurrentUser() userId: number,
    @Param('userId') oppenseId: number,
  ) {
    const userRelation = await this.userRelService.findOne(userId, oppenseId);
    if (userRelation.status !== UserRelStatus.block) {
      throw new BadRequestException('차단한 유저가 아닙니다.');
    }

    return this.userRelService.remove(userRelation);
  }
}
