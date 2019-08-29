import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Team, Message, ChannelMember } from '.';

@Entity()
export default class Channel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column({ default: true }) isPublic: boolean;

  @Column({ default: 'normal' }) channelType: string;

  @ManyToOne(() => Team, team => team.channels, { nullable: false })
  team: Team;

  @OneToMany(() => Message, message => message.channel)
  messages: Message[];

  @OneToMany(() => ChannelMember, channelMember => channelMember.channel)
  channelMember: ChannelMember[];
}
