import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bscript from 'bcryptjs';
import { TeamMember, Message, ChannelMember } from '.';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @OneToMany(() => TeamMember, teamMember => teamMember.user)
  teamMember: TeamMember[];

  @OneToMany(() => ChannelMember, channelMember => channelMember.user)
  channelMember: ChannelMember[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bscript.hash(this.password, 10);
  }
}
