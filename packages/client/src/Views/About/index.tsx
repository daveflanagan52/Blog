import React from 'react';
import { Helmet } from 'react-helmet';

import Container from '../../Components/Container';
import Location from '../../Components/Location';
import RandomPosts from '../../Components/RandomPosts';

const About: React.FC = () => (
  <>
    <Helmet>
      <title>Dave &amp; Suvi | About Us</title>
    </Helmet>
    <Container>
      <section className="about">
        <h1 className="title">Dave</h1>
      </section>

      <section className="about">
        <h1 className="title">Suvi</h1>
      </section>

      <section className="about">
        <h1 className="title">George</h1>
      </section>

      <RandomPosts />
      <Location />
    </Container>
  </>
);

export default About;
