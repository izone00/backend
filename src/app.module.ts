import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { GameModule } from './game/game.module';
import { DirectMessagesModule } from './direct-messages/direct-messages.module';
import { User } from './users/users.entity';
import { Channel } from './channels/channels.entity';
import { UserRelation } from './user-relation/user-relation.entity';
import { ChannelRelation } from './channel-relation/channel-relation.entity';
import { FriendsModule } from './friends/friends.module';
import { BlocksModule } from './blocks/blocks.module';
// {
//   type: 'sqlite',
//   database: 'db.sqlite',
//   entities: [User, Channel, UserRelation, ChannelRelation],
//   synchronize: true,
// }

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      password: '4242',
      username: 'woojin',
      entities: [User, Channel, UserRelation, ChannelRelation],
      database: 'nest-postgres',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    FriendsModule,
    BlocksModule,
    ChannelsModule,
    // RedisModule,
    // GameModule,
    // DirectMessagesModule,
  ],
})
export class AppModule {}
