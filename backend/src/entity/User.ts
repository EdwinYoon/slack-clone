import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
// import { Team } from './Team';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'text', unique: true }) email: string;

  @Column() username: string;

  @Column() password: string;
}
