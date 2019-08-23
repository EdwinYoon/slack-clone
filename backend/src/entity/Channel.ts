import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import Team from './Team';
import Message from './Message';

@Entity()
export default class Channel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column({ default: true }) isPublic: boolean;

  @ManyToOne(() => Team, team => team.channels, { nullable: false })
  team: Team;

  @OneToMany(() => Message, message => message.channel)
  messages: Message[];
}
