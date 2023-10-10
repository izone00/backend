import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { UserRelationModule } from 'src/user-relation/user-relation.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, UserRelationModule],
  controllers: [FriendsController],
})
export class FriendsModule {}
