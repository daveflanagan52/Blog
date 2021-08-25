import React from 'react';
import { OrderDirection, OrderTypes, useGetPostsQuery } from '../../Services/Post';
import PostPreview from '../PostPreview';

type RandomPostsProps = {
  exclude?: number,
}

const RandomPosts = ({ exclude }: RandomPostsProps) => {
  const { data, isLoading } = useGetPostsQuery({
    order: OrderTypes.Random,
    direction: OrderDirection.Descending,
    limit: 3,
    exclude,
  });

  return (
    <section className="posts">
      <h2 className="title mb-4">Other Posts to Check Out</h2>
      {!isLoading && !data && (
        <>
          <h1 className="title text-center text-primary">Oh no!</h1>
          <p className="text-center mb-5">It seems there's no posts here, check back soon!</p>
        </>
      )}
      <div className="row">
        {(data || []).map((post) => <div key={post.id} className="col col-md-4"><PostPreview {...post} /></div>)}
      </div>
    </section>
  );
};

export default RandomPosts;
