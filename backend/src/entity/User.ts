import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import Team from './Team';
import Channel from './Channel';
import Message from './Message';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'text', unique: true }) email: string;

  @Column({ select: false }) password: string;

  @ManyToMany(() => Team)
  @JoinTable()
  teams: Team[];

  @ManyToMany(() => Channel)
  @JoinTable()
  channels: Channel[];

  @OneToMany(() => Message, message => message.user)
  messages: Message[];
}
