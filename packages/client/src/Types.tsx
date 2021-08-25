type Post = {
  id: number,
  name: string,
  slug: string,
  author: Author,
  thumbnail: string,
  excerpt: string,
  content?: string,
  createdAt: Date,
  country: Country,
  categories?: Category[],
  comments?: Comment[],
  components?: PostCompoment[],
};

type PostCompoment = {
  type: string,
  content: string,
  width?: number,
  align?: string,
  order: number,
};

type Comment = {
  id: number,
  name: string,
  avatar: string,
  content?: string,
  createdAt?: Date,
};

type Category = {
  id: number,
  name: string,
  slug: string,
  description?: string,
  thumbnail?: string,
  posts?: Post[],
};

type Country = {
  id: number,
  name: string,
  code: string,
  posts?: Post[],
};

type Location = {
  name: string,
  country: string,
};

type Author = {
  id: number,
  name: string,
};

export type {
  Post, Comment, Category, Country, Location, Author, PostCompoment
};
