import {
  Column, Entity, ManyToMany, PrimaryGeneratedColumn, BaseEntity,
} from 'typeorm';
import { Post } from './Post';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts?: Post[];
}
