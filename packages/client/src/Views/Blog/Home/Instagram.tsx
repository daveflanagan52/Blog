import React from 'react';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Instagram = () => (
  <section className="instagram">
    <div className="instagram-profile">
      <div className="instagram-insert">
        <a href="https://www.instagram.com/daveandsuvi/" target="_blank" rel="noreferrer noopener">
          <FontAwesomeIcon icon={faInstagram} />
          @daveandsuvi
        </a>
      </div>
      <div className="vertical-separator" />
      <div>
        <h2 className="title h3">Connect with Us</h2>
        <ul className="social">
          <li>
            <a href="https://fb.me/daveandsuvi" target="_blank" rel="noreferrer noopener">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/daveandsuvi/" target="_blank" rel="noreferrer noopener">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCFVNwVZ_-qiPHZtHuv80SsA" target="_blank" rel="noreferrer noopener">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="feed" />
  </section>
);

export default Instagram;
