import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetCountryQuery } from '../../../Services/Post';

import Header from '../../../Components/Header';
import Container from '../../../Components/Container';
import Footer from '../../../Components/Footer';
import Loader from '../../../Components/Loader';
import PostPreview from '../../../Components/PostPreview';

type CountryParams = {
  country: string;
};

const Country = () => {
  const { country } = useParams<CountryParams>();
  const { data, isLoading } = useGetCountryQuery(country);

  return (
    <>
      <Loader show={isLoading} />
      <Header />

      <Container>
        <h1 className="title mb-4">{data?.name || ''}</h1>
        {!isLoading && (!data?.posts || data.posts.length === 0) && (
          <>
            <h1 className="title text-center text-primary">Oh no!</h1>
            <p className="text-center mb-5">It seems there's no posts here, check back soon!</p>
          </>
        )}
        <div className="row">
          {(data?.posts || []).map((post) => <div className="col col-md-4"><PostPreview {...post} /></div>)}
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Country;
