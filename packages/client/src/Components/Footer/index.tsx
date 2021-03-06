import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import moment from 'moment';
import Container from '../Container';

const Footer: React.FC = () => (
  <footer>
    <Container>
      <div className="footer">
        <div>
          <a href="#top">Back to Top</a>
          <span className="mx-2">|</span>
          <Link to="/">Back to Home</Link>
          <span className="mx-2">|</span>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
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
        <div className="copyright">
          &copy;
          {' '}
          {moment().format('YYYY')}
          {' '}
          Dave &amp; Suvi
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
