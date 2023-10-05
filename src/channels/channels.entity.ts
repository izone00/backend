import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { ChannelRelation } from 'src/channel-relation/channel-relation.entity';
import { UUID } from 'crypto';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.own_channels)
  owner: User;

  @Column()
  password: string;

  @Column()
  isPrivate: boolean;

  @OneToMany(() => ChannelRelation, (relation) => relation.channel)
  relations: ChannelRelation;
}
