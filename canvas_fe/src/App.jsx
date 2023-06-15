import React, { Fragment } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/auth/LoginPage';

const App = () => {

  const isLoggedIn = () => {
    if(localStorage.getItem('token')) {
      return true;
    }
  return false;
  };

  return (
    <Fragment>
      {isLoggedIn()?<HomePage/>: <LoginPage /> }
    </Fragment>
  );
};

export default App;
