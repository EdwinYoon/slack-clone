import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { TeamMember, Channel, Message } from '.';

@Entity()
export default class Team extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;
  @Column() isPublic: boolean;

  @OneToMany(() => Channel, channel => channel.team)
  channels: Channel[];

  @OneToMany(() => Message, message => message.team)
  messages: Message[];

  @OneToMany(() => TeamMember, teamMember => teamMember.team)
  teamMember: TeamMember[];
}
