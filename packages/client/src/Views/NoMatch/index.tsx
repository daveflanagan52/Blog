import React from 'react';

import Container from '../../Components/Container';

const NoMatch: React.FC = () => (
  <>
    <Container>
      <h1 className="title text-center text-primary">Oh no!</h1>
      <p className="text-center">It seems there's no posts here, check back soon!</p>
    </Container>
  </>
);

export default NoMatch;
