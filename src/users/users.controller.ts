import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRelationService } from 'src/user-relation/user-relation.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private userRelation: UserRelationService,
  ) {}
}
