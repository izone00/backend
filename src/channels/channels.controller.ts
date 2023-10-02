import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decoraor';
import { User } from 'src/users/users.entity';

@Controller('channels')
export class ChannelsController {
  constructor() {}

  @Get()
  findAllChannels(@CurrentUser() user: User) {
    console.log(user);
  }
}
