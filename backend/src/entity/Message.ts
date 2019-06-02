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

@Entity()
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text') text: string;

  @CreateDateColumn()
  @UpdateDateColumn()
  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Channel) channel: Channel;
}
