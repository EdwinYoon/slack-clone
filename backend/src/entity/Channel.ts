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

  @Column() name: string;

  @Column({ default: true }) isPublic: boolean;

  @ManyToOne(() => Team, team => team.id, { nullable: false })
  team: Team;
}
