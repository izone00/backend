import { Injectable } from '@nestjs/common';
import { UserRelation } from './user-relation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRelationService {
  constructor(
    @InjectRepository(UserRelation) private repo: Repository<UserRelation>,
  ) {}
}
