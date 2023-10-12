import { Channel } from 'src/channels/channels.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ChannelRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Channel, (channel) => channel.relations, {
    eager: true,
    onDelete: 'CASCADE',
  })
  channel: Channel;

  @ManyToOne(() => User, (user) => user.channel_relations, { eager: true })
  user: User;

  @Column()
  isOwner: boolean = false;

  @Column()
  isAdmin: boolean = false;

  @Column()
  isBanned: boolean = false;

  @CreateDateColumn()
  created_at: Date;
}
