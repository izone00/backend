import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { FriendsModule } from './friends/friends.module';
import { BlocksModule } from './blocks/blocks.module';
import { GameModule } from './game/game.module';
import { ChannelMemberModule } from './channel-member/channel-member.module';
import { ChannelMembersModule } from './channel-members/channel-members.module';
import { UserRelationModule } from './user-relation/user-relation.module';
import { DirectMessagesModule } from './direct-messages/direct-messages.module';
import { MatchHistoryModule } from './match-history/match-history.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ChannelsModule,
    FriendsModule,
    BlocksModule,
    GameModule,
    ChannelMemberModule,
    ChannelMembersModule,
    UserRelationModule,
    DirectMessagesModule,
    MatchHistoryModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
