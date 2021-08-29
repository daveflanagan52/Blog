import React from 'react';
import { Helmet } from 'react-helmet';

import dave from '../../Resources/dave.jpg';
import suvi from '../../Resources/suvi.jpg';

import Container from '../../Components/Container';
import Location from '../../Components/Location';
import RandomPosts from '../../Components/RandomPosts';
import Row from '../../Components/Row';
import Column from '../../Components/Column';

const About: React.FC = () => (
  <>
    <Helmet>
      <title>Dave &amp; Suvi | About Us</title>
    </Helmet>
    <Container>
      <section className="about">
        <h1 className="title">Dave</h1>
        <Row>
          <Column md={3}>
            <img src={dave} className="img-fluid" />
          </Column>
          <Column md={9}>
            
          </Column>
        </Row>
      </section>

      <section className="about">
        <h1 className="title">Suvi</h1>
        <Row>
          <Column md={9}>

          </Column>
          <Column md={3}>
            <img src={suvi} className="img-fluid" />
          </Column>
        </Row>
      </section>

      <section className="about clearfix">
        <h1 className="title">George</h1>
      </section>

      <RandomPosts />
      <Location />
    </Container>
  </>
);

export default About;
