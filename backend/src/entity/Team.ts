import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import Channel from './Channel';
import Message from './Message';

@Entity()
export default class Team extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @OneToMany(() => Channel, channel => channel.team)
  channels: Channel[];

  @OneToMany(() => Message, message => message.team)
  messages: Message[];
}
