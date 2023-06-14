import React, { Fragment } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/auth/LoginPage';

const App = () => {

  const isLoggedIn = () => {
    return localStorage.getItem('access_token') == null;
  };
  
  return (
    <Fragment>
      {isLoggedIn?<LoginPage/>: <HomePage isLoggedIn={isLoggedIn}/>}
    </Fragment>
  );
};

export default App;
