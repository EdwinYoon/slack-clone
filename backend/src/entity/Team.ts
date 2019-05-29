import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Channel } from './Channel';

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @OneToMany(type => Channel, channel => channel.id)
  channel: Channel;
}
