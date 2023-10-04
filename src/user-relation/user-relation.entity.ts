import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRelStatus } from './user-relation.enum';
import { User } from 'src/users/users.entity';

@Entity()
export class UserRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => User)
  oppense: User;

  @Column()
  status: UserRelStatus;
}
