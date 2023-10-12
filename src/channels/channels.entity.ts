import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { ChannelRelation } from 'src/channel-relation/channel-relation.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToOne(() => User, (user) => user.own_channels, { eager: true })
  owner: User;

  @Column()
  password: string = '';

  @Column()
  isPrivate: boolean = false;

  @OneToMany(() => ChannelRelation, (relation) => relation.channel)
  relations: ChannelRelation;
}
