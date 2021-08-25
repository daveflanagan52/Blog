import React from 'react';

import Button, { ButtonType } from '../../../Components/Button';

import img from '../../../Resources/van.png';

const Build = () => (
  <section className="build">
    <div className="content">
      <div className="title">Build Log</div>
      <div className="description">Want to see how we built our van? Or maybe you need help with a certain part of your own build? Check out the details here!</div>
      <div className="action">
        <Button link="/category/build" type={ButtonType.Dark} text="View Posts" />
      </div>
    </div>
    <div className="media">
      <img alt="Van" src={img} />
    </div>
  </section>
);

export default Build;
