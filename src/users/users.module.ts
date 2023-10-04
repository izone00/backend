import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { UserRelationService } from 'src/user-relation/user-relation.service';
import { UserRelationModule } from 'src/user-relation/user-relation.module';
import { UserRelation } from 'src/user-relation/user-relation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRelation]), UserRelationModule],
  providers: [UsersService, UserRelationService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
