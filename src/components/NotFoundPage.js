import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header/Header.js';

function NotFoundPage() {
  return (
    <React.Fragment>
      <Header />
      Page not found. Goto <Link to="/dashboard">Home Page</Link>
    </React.Fragment>
  );
};

export default NotFoundPage;