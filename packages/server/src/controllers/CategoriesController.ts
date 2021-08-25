import { PathParams, Controller, Get } from '@tsed/common';
import { Returns, ContentType } from '@tsed/schema';
import { Post } from 'src/entities/Post';
import { BaseController } from './BaseController';
import { Category } from '../entities/Category';

@Controller('/categories')
export class CategoriesController extends BaseController {
  @Get('/')
  @ContentType('application/json')
  @Returns(200, Array).Of(Category)
  find(): Promise<Category[]> {
    return Category.find().then((categories: Category[]) => categories.filter((c) => c.slug !== 'build'));
  }

  @Get('/:slug')
  @ContentType('application/json')
  @Returns(200, Category)
  findBySlug(@PathParams('slug') slug: string): Promise<Category | undefined> {
    return Category.findOne(undefined, { where: { slug }, relations: ['posts', 'posts.components'] })
      .then((category: Category) => ({
        ...category,
        posts: category.posts?.filter((post: Post) => post.published).sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt === b.createdAt ? 0 : -1)),
      } as Category));
  }
}
