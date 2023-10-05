import { Channel } from 'src/channels/channels.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['channel', 'is_admin'])
export class ChannelRelation {
  @ManyToOne(() => Channel, (channel) => channel.relations)
  @PrimaryColumn()
  channel: Channel;

  @ManyToOne(() => User, (user) => user.channel_relations)
  @PrimaryColumn()
  user: User;

  @Column()
  isOwner: boolean = false;

  @Column()
  isAdmin: boolean = false;

  @Column()
  inBanned: boolean = false;
}
