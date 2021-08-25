import {
  Column, Entity, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn, BaseEntity,
} from 'typeorm';
import { Author } from './Author';
import { Category } from './Category';
import { Comment } from './Comment';
import { Country } from './Country';

@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column('text')
  content: string;

  @Column({ default: false })
  published: boolean;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: '' })
  thumbnail: string;

  @ManyToOne(() => Author, (author) => author.posts)
  author?: Author;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories?: Category;

  @ManyToOne(() => Country, (country) => country.posts)
  country?: Country;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];
}
