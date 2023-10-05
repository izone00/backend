import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UUID } from 'crypto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserCreateDto } from './dtos/user-create.dto';

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
  findOne(@Param('id') id: UUID) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: UUID, @Body() body: UserUpdateDto) {
    return this.usersService.update(id, body);
  }
}
