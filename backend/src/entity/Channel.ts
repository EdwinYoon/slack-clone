import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from 'typeorm';
import Team from './Team';

@Entity()
export default class Channel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column() public: boolean;

  @ManyToOne(type => Team, team => team.id)
  team: Team;
}
