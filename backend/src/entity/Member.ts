import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  Column,
  BaseEntity,
} from 'typeorm';
import User from './User';
import Team from './Team';

@Entity()
export default class Member extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column()
  userId: string;

  @Column()
  teamId: string;

  @ManyToOne(() => User) user: User;
  @ManyToOne(() => Team) team: Team;
}
