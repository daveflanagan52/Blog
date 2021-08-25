import React from 'react';

import Header from '../../../Components/Header';
import Container from '../../../Components/Container';
import Location from '../../../Components/Location';
import Footer from '../../../Components/Footer';
import RandomPosts from '../../../Components/RandomPosts';

const About = () => (
  <>
    <Header />

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

    <Footer />
  </>
);

export default About;
