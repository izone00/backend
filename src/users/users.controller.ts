import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserCreateDto } from './dtos/user-create.dto';
import { CurrentUser } from './decorators/current-user.decoraor';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  signin(@Body() body: UserCreateDto) {
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put()
  async update(@CurrentUser() userId: number, @Body() body: UserUpdateDto) {
    const user = await this.usersService.findOne(userId);

    return this.usersService.update(user, body);
  }
}
