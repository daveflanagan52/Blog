import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Stop } from './Stop';

@Entity()
export class Timeline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  length: number;

  @OneToMany(() => Stop, (stop) => stop.timeline)
  stops?: Stop[];

  @Column()
  polyline: string;

  @Column()
  date: Date;
}
