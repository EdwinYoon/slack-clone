import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';
import Channel from './Channel';
import Team from './Team';

@Entity()
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text') text: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
  @ManyToOne(() => Team, team => team.messages, { nullable: false })
  team: Team;

  @ManyToOne(() => User, user => user.messages, { nullable: false })
  user: User;

  @ManyToOne(() => Channel, channel => channel.messages, { nullable: false })
  channel: Channel;
}
