import { PathParams, Controller, Get } from '@tsed/common';
import { Returns, ContentType } from '@tsed/schema';
import { Post } from 'src/entities/Post';
import { BaseController } from './BaseController';
import { Country } from '../entities/Country';

@Controller('/countries')
export class CountriesController extends BaseController {
  @Get('/:code')
  @ContentType('application/json')
  @Returns(200, Country)
  findByCode(@PathParams('code') code: string): Promise<Country | undefined> {
    return Country.findOne(undefined, { where: { code: code.toUpperCase() }, relations: ['posts', 'posts.components'] })
      .then((country: Country) => {
        country.posts = country.posts?.slice().filter((post: Post) => post.published).sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt === b.createdAt ? 0 : -1));
        return country;
      });
  }
}
