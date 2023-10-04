import { Channel } from 'src/channels/channels.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChannelRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Channel, (channel) => channel.relations)
  channel: Channel;

  @ManyToOne(() => User, (user) => user.channel_relations)
  user: User;

  @Column()
  is_owner: boolean;

  @Column()
  is_admin: boolean;

  @Column()
  is_banned: boolean;
}
