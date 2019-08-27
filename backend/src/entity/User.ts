import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { TeamMember, Message, ChannelMember } from '.';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'text', unique: true }) email: string;

  @Column({ select: false }) password: string;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @OneToMany(() => TeamMember, teamMember => teamMember.user)
  teamMember: TeamMember[];

  @OneToMany(() => ChannelMember, channelMember => channelMember.user)
  channelMember: ChannelMember[];
}
