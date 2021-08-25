import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetCategoryQuery } from '../../../Services/Post';

import Header from '../../../Components/Header';
import Container from '../../../Components/Container';
import Footer from '../../../Components/Footer';
import Loader from '../../../Components/Loader';
import PostPreview from '../../../Components/PostPreview';

type CategoryParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<CategoryParams>();
  const { data, isLoading } = useGetCategoryQuery(category);

  return (
    <>
      <Loader show={isLoading} />
      <Header />

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
          <div className="row">
            {(data?.posts || []).map((post) => <div key={post.id} className="col col-md-4"><PostPreview {...post} /></div>)}
          </div>
        </section>
      </Container>

      <Footer />
    </>
  );
};

export default Category;
