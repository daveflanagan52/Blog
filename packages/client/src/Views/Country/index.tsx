import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { useGetCountryQuery } from '../../Services/Post';

import Container from '../../Components/Container';
import Loader from '../../Components/Loader';
import PostPreview from '../../Components/PostPreview';
import Row from '../../Components/Row';
import Column from '../../Components/Column';

type CountryParams = {
  country: string;
};

const Country: React.FC = () => {
  const { country } = useParams<CountryParams>();
  const { data, isLoading } = useGetCountryQuery(country);

  return (
    <>
      <Helmet>
        <title>
          Dave &amp; Suvi |
          {data?.name || 'Country'}
        </title>
      </Helmet>
      <Loader show={isLoading} />

      <Container>
        <h1 className="title mb-4">{data?.name || ''}</h1>
        {!isLoading && (!data?.posts || data.posts.length === 0) && (
          <>
            <h1 className="title text-center text-primary">Oh no!</h1>
            <p className="text-center mb-5">It seems there's no posts here, check back soon!</p>
          </>
        )}
        <Row>
          {(data?.posts || []).map((post) => <Column key={post.id} md={4}><PostPreview {...post} /></Column>)}
        </Row>
      </Container>
    </>
  );
};

export default Country;
