import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity,
} from 'typeorm';
import { Post } from './Post';

@Entity()
export class PostComponent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'text' })
  type: 'text' | 'image' | 'video';

  @Column('text', { nullable: true })
  content: string;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  align: string;

  @Column({ nullable: true })
  order: number;

  @ManyToOne(() => Post, (post) => post.components)
  post?: Post;
}
