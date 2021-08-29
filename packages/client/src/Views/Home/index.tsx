import React from 'react';
import { Helmet } from 'react-helmet';

import Container from '../../Components/Container';
import Button, { ButtonType } from '../../Components/Button';
import Location from '../../Components/Location';
import LatestPosts from '../../Components/LatestPosts';

import Categories from './Categories';
import Build from './Build';

import img from '../../Resources/us.png';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dave &amp; Suvi | Home</title>
      </Helmet>

      <Container>

        <section className="profile">
          <div className="content">
            <div className="dropcap">D&amp;S</div>
            <div className="title h2">We're Dave &amp; Suvi, vanlife adventurers.</div>
            <p className="description">We enjoy nothing more than travelling and visiting new places. With a shared dream of seeing the entire world, we hope to see as much of it as possible and bring you along for the ride!</p>
            <p className="description">Our van is a 2010 Peugeot Boxer that we converted ourselves, complete with running water and electricity, to be our home for the next few years.</p>
            <Button type={ButtonType.Secondary} link="/about/" text="Learn More About Us" />
          </div>
          <div className="media">
            <img alt="Us" src={img} />
          </div>
        </section>

        <Categories />
        <LatestPosts />
        <Build />
        <Location />
      </Container>
    </>
  );
};

export default Home;
