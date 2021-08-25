import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Timeline } from './Timeline';

@Entity()
export class Stop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column()
  dateTime: Date;

  @ManyToOne(() => Timeline, (timeline) => timeline.stops)
  timeline?: Timeline;
}
