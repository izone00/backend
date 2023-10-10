import { Module } from '@nestjs/common';
import { BlocksController } from './blocks.controller';
import { UsersModule } from 'src/users/users.module';
import { UserRelationModule } from 'src/user-relation/user-relation.module';

@Module({
  imports: [UsersModule, UserRelationModule],
  controllers: [BlocksController],
})
export class BlocksModule {}
