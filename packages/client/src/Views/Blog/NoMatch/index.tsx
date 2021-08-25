import React from 'react';

import Header from '../../../Components/Header';
import Container from '../../../Components/Container';
import Footer from '../../../Components/Footer';

const NoMatch = () => (
  <>
    <Header />

    <Container>
      <h1 className="title text-center text-primary">Oh no!</h1>
      <p className="text-center">It seems there's no posts here, check back soon!</p>
    </Container>

    <Footer />
  </>
);

export default NoMatch;
