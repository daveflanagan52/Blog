import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Post, Category, Country, Location,
} from '../Types';

enum OrderTypes {
  DatePosted = 'createdAt',
  Random = 'rand',
  Title = 'name',
}

enum OrderDirection {
  Ascending = 'ASC',
  Descending = 'DESC',
}

type FetchPostAttrs = {
  limit?: number,
  order?: OrderTypes,
  direction?: OrderDirection,
  exclude?: number
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], FetchPostAttrs>({
      query: (attrs) => `posts?${Object.keys(attrs).filter((k: keyof FetchPostAttrs) => attrs[k]).map((k: keyof FetchPostAttrs) => `${k}=${attrs[k]}`).join('&')}`,
    }),
    getPost: builder.query<Post, string>({
      query: (post) => `posts/${post}`,
    }),
    getCategories: builder.query<Category[], undefined>({
      query: () => 'categories',
    }),
    getCategory: builder.query<Category, string>({
      query: (category) => `categories/${category}`,
    }),
    getCountry: builder.query<Country, string>({
      query: (country) => `countries/${country}`,
    }),
    getLocation: builder.query<Location, undefined>({
      query: () => 'location',
    }),
  }),
});

export type { FetchPostAttrs };
export const {
  useGetPostsQuery, useGetPostQuery, useGetCategoriesQuery, useGetCategoryQuery, useGetCountryQuery, useGetLocationQuery,
} = postsApi;
export { OrderDirection, OrderTypes };
