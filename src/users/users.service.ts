import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UUID } from 'crypto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserCreateDto } from './dtos/user-create.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create({ email, nickname }: UserCreateDto) {
    const user = this.repo.create({
      email,
      nickname,
      lp: 1000,
    });

    return this.repo.save(user);
  }

  // 인자로 어떤걸 받을지 모르겟음
  findAll() {
    return this.repo.find();
  }

  async findOne(id: UUID) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return user;
  }

  async update(id: UUID, body: UserUpdateDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    Object.assign(user, body);

    return this.repo.save(user);
  }
}
