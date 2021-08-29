import { MaxLength, Property, Required } from '@tsed/schema';
import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn, BaseEntity,
} from 'typeorm';
import { Post } from './Post';
import { Vehicle } from './Vehicle';

@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(100)
  @Required()
  name: string;

  @Column()
  @MaxLength(2)
  @Required()
  code: string;

  @OneToMany(() => Post, (post) => post.country)
  posts?: Post[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.country)
  vehicles?: Vehicle[];
}
