import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Team from './Team';
import Channel from './Channel';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'text', unique: true }) email: string;

  @Column({ type: 'int', default: 0 }) count: number;

  @Column() username: string;

  @Column() password: string;

  @ManyToMany(() => Team)
  @JoinTable()
  teams: Team[];

  @ManyToMany(() => Channel)
  @JoinTable()
  channels: Channel[];
}
