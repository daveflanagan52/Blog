import React from 'react';
import { OrderDirection, OrderTypes, useGetPostsQuery } from '../../Services/Post';
import Column from '../Column';
import PostPreview from '../PostPreview';
import Row from '../Row';

type RandomPostsProps = {
  exclude?: number,
}

const RandomPosts: React.FC<RandomPostsProps> = ({ exclude }) => {
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
      <Row>
        {(data || []).map((post) => <Column key={post.id} md={4}><PostPreview {...post} /></Column>)}
      </Row>
    </section>
  );
};

export default RandomPosts;
