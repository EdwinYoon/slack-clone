import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from 'typeorm';
import { User, Channel } from '.';

@Entity()
export default class ChannelMember extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column()
  userId: string;

  @Column()
  channelId: string;

  @ManyToOne(() => Channel, channel => channel.channelMember, {
    nullable: false,
  })
  channel: Channel;

  @ManyToOne(() => User, user => user.channelMember, { nullable: false })
  user: User;
}
