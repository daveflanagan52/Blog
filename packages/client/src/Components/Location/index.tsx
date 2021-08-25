import React from 'react';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetLocationQuery } from '../../Services/Post';

import Button, { ButtonType } from '../Button';

import img from '../../Resources/location.jpg';

const Location = () => {
  const { data } = useGetLocationQuery(undefined);

  return (
    <section className="location">
      <div className="content">
        <div className="icon">
          <FontAwesomeIcon icon={faMapMarkedAlt} />
        </div>

        <div className="text">
          <h4 className="subtitle h4">We're currently having fun in:</h4>
          <h2 className="title h2">{data?.name || 'Unknown'}</h2>
        </div>
      </div>
      <div className="media">
        <img alt="Location background" src={img} />
      </div>
      <Button link={`/country/${data?.country || 'finland'}`} type={ButtonType.Link} text="View posts" />
    </section>
  );
};

export default Location;
