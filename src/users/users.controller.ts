import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
}
