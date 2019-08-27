import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  Column,
  BaseEntity,
} from 'typeorm';
import { User, Team } from '.';

@Entity()
export default class TeamMember extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column()
  userId: string;

  @Column()
  teamId: string;

  @Column()
  username: string;

  @ManyToOne(() => User, user => user.teamMember)
  user: User;

  @ManyToOne(() => Team, team => team.teamMember)
  team: Team;
}
