import React from 'react';
import { io } from 'socket.io-client';

import Header from '../../../Components/Header';
import Container from '../../../Components/Container';
import Button, { ButtonType } from '../../../Components/Button';
import Location from '../../../Components/Location';
import LatestPosts from '../../../Components/LatestPosts';

import Categories from './Categories';
import Build from './Build';
import Instagram from './Instagram';

import img from '../../../Resources/us.png';

const Home = () => {
  const socket = io('http://localhost:8083', { path: '/socket.io/vehicle', query: { key: 'eba1b95b-0ef6-44e0-b66d-0826da908a03' } });

  socket.on('connect', () => {
    console.log(socket);
    console.log('connected to server');
    socket.send('dataPing');
  });

  // handle the event sent with socket.send()
  socket.on('disconnect', (data) => {
    console.log('disconnected');
  });

  socket.onAny((event, ...args) => {
    console.log(`got ${event}`, args);
  });

  return (
    <div>
      <Header />

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
    </div>
  );
};

export default Home;
