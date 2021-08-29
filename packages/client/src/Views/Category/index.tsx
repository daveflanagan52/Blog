import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { useGetCategoryQuery } from '../../Services/Post';

import Container from '../../Components/Container';
import Loader from '../../Components/Loader';
import PostPreview from '../../Components/PostPreview';
import Row from '../../Components/Row';
import Column from '../../Components/Column';

type CategoryParams = {
  category: string;
};

const Category: React.FC = () => {
  const { category } = useParams<CategoryParams>();
  const { data, isLoading } = useGetCategoryQuery(category);

  return (
    <>
      <Helmet>
        <title>Dave &amp; Suvi | {data?.name || 'Category'}</title>
      </Helmet>
      <Loader show={isLoading} />

      <Container>
        <section className="posts">
          <h1 className="title mb-2">{data?.name || ''}</h1>
          <p className="mb-4 text-center">{data?.description || ''}</p>
          {!isLoading && (!data?.posts || data.posts.length === 0) && (
            <>
              <h1 className="title text-center text-primary">Oh no!</h1>
              <p className="text-center mb-5">It seems there's no posts here, check back soon!</p>
            </>
          )}
          <Row>
            {(data?.posts || []).map((post) => <Column key={post.id} md={4}><PostPreview {...post} /></Column>)}
          </Row>
        </section>
      </Container>
    </>
  );
};

export default Category;
