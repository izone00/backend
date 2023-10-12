import {
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => User, (user) => user.userRelations, { eager: true })
  user: User;

  @ManyToOne(() => User, { eager: true })
  oppense: User;

  // @Column({
  //   type: 'enum',
  //   enum: UserRelStatus,
  // })
  @Column()
  status: UserRelStatus;
}
