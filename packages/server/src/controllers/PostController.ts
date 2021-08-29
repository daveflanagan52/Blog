import {
  Controller, Get, PathParams, QueryParams,
} from '@tsed/common';
import { Returns, ContentType } from '@tsed/schema';
import md5 from 'md5';

import { BaseController } from './BaseController';
import { Post } from '../entities/Post';
import { Comment } from '../entities/Comment';
import { PostComponent } from '../entities/PostComponent';

@Controller('/posts')
export class PostController extends BaseController {
  @Get('/')
  @ContentType('application/json')
  @Returns(200, Array).Of(Post)
  find(@QueryParams('limit') limit: number, @QueryParams('order') order: string, @QueryParams('direction') direction: string, @QueryParams('exclude') exclude?: string): Promise<Post[]> {
    if (order === 'rand') {
      return this.connection
        .createQueryBuilder('post', 'p')
        .limit(limit)
        .where(`p.published = true and p.id != ${exclude || -1}`)
        .orderBy('RANDOM()')
        .getMany()
        .then(result => result as Post[])
        .then(async result => await Promise.all(result.map(async post => {
          return PostComponent.find({ where: { post } }).then(components => {
            return {
              ...post,
              components: components
            }
          });
        })))
        .then(result => result as Post[]);
    }
    const o: any = {};
    o[order] = direction;
    return Post.find({
      where: {
        published: true,
      },
      order: o,
      take: limit,
      relations: ['components']
    });
  }

  @Get('/:slug')
  @ContentType('application/json')
  @Returns(200, Post)
  findBySlug(@PathParams('slug') slug: string): Promise<Post | undefined> {
    return Post.findOne(undefined, { where: { published: true, slug }, relations: ['categories', 'author', 'country', 'comments', 'components'] })
      .then((post: Post) => {
        const comments = post.comments?.filter((comment: Comment) => comment.approved).map((comment: Comment) => ({
          name: comment.name,
          content: comment.content,
          createdAt: comment.createdAt,
          avatar: `https://www.gravatar.com/avatar/${md5(comment.email)}?s=56`,
        }));
        return {
          ...post,
          comments,
        } as Post;
      });
  }
}
