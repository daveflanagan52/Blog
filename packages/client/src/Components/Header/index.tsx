import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../Container';

const Header = () => (
  <header>
    <Container>
      <Link to="/" className="dropcap">D&amp;S</Link>
    </Container>
  </header>
);

export default Header;
