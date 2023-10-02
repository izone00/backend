import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.own_channels)
  owner: User;

  @Column()
  title: string;

  @Column()
  is_private: boolean;

  @Column()
  password: string;
}
