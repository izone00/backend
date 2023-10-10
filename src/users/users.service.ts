import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserCreateDto } from './dtos/user-create.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create({ email, nickname }: UserCreateDto) {
    const user = this.repo.create({
      email,
      nickname,
    });

    return this.repo.save(user);
  }

  // 인자로 어떤걸 받을지 모르겟음
  findAll() {
    return this.repo.find();
  }

  async findOne(id: number, findOpt?: FindOneOptions<User>) {
    const user = await this.repo.findOne({
      ...findOpt,
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return user;
  }

  async update(user: User, body: UserUpdateDto) {
    Object.assign(user, body);

    return this.repo.save(user);
  }
}
