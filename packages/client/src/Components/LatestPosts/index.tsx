import React from 'react';
import { OrderDirection, OrderTypes, useGetPostsQuery } from '../../Services/Post';
import PostPreview from '../PostPreview';
import Loader from '../Loader';
import Row from '../Row';
import Column from '../Column';

const LatestPosts: React.FC = () => {
  const { data, isLoading } = useGetPostsQuery({
    order: OrderTypes.DatePosted,
    direction: OrderDirection.Descending,
    limit: 6,
  });

  return (
    <>
      <Loader show={isLoading} />
      <section className="posts">
        <h2 className="title mb-4">Latest Posts</h2>
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
    </>
  );
};

export default LatestPosts;
