import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRelStatus } from './user-relation.enum';
import { User } from 'src/users/users.entity';

@Entity()
@Unique(['user', 'oppense'])
export class UserRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userRelations)
  user: User;

  @ManyToOne(() => User)
  oppense: User;

  @Column()
  status: UserRelStatus;
}
