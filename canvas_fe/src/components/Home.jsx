import React from 'react';

const Home = (props) => {
  return (
    <>
    <div id="main-container">
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center" id="welcome-element">
        <span className="align-middle">
          <h2>Welcome to Lifecanvas, {props.firstName}</h2>
        </span>
        <span className="align-middle">
          <p>Start writing your journal here!</p>
        </span>
      </div>
    </div>
    </>
  );
};

export default Home;