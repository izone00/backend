import { UUID } from 'crypto';
import { ChannelRelation } from 'src/channel-relation/channel-relation.entity';
import { Channel } from 'src/channels/channels.entity';
import { UserRelation } from 'src/user-relation/user-relation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  lp: number;

  // @Column()
  // abatar: string

  @Column()
  bio: string;

  @OneToMany(() => Channel, (channel) => channel.owner)
  own_channels: Channel[];

  @OneToMany(() => ChannelRelation, (channelRelation) => channelRelation.user)
  channel_relations: ChannelRelation[];

  @OneToMany(() => UserRelation, (userRelation) => userRelation.user)
  userRelations: UserRelation[];
}
