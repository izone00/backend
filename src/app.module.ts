import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { FriendsModule } from './friends/friends.module';
import { BlocksModule } from './blocks/blocks.module';
import { GameModule } from './game/game.module';
import { DirectMessagesModule } from './direct-messages/direct-messages.module';
import { User } from './users/users.entity';
import { Channel } from './channels/channels.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Channel],
      synchronize: true,
    }),
    UsersModule,
    ChannelsModule,
    FriendsModule,
    BlocksModule,
    GameModule,
    DirectMessagesModule,
  ],
})
export class AppModule {}
