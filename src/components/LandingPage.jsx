import React from 'react';
import '../style/LandingPage.css';

const LandingPage = ({ onBegin }) => {
  return (
    <div className="landing-container">
      <h1>Welcome to PokéBattle Arena</h1>
      <button onClick={onBegin} className="begin-btn">Begin</button>
    </div>
  );
};

export default LandingPage;
