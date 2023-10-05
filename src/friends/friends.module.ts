import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRelation } from 'src/user-relation/user-relation.entity';
import { UserRelationModule } from 'src/user-relation/user-relation.module';

@Module({
  imports: [UserRelationModule],
  controllers: [FriendsController],
})
export class FriendsModule {}
