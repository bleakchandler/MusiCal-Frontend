import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Header from '../Header/Header.js';

function Home() {
  return (
    <div className="login">
      <Header />
      <Button variant="info" type="submit">
        Login to Spotify
      </Button>
    </div>
  );
};

export default connect()(Home);