import { Channel } from 'src/channels/channels.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}
