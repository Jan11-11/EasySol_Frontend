import React from 'react';
import './Snack.css';
import { useNavigate } from 'react-router-dom';

const Snack = () => {
  const navigate = useNavigate()
  return (
    <div className="body">
    <div className="coming-soon-container">
      <div className="particles"
       style={{background:"url(./images/maxresdefault.jpg)"}} 
       ></div>
      <div className="coming-soon-content">
        <div className="logo-spin">
          <img src="./images/EasySol.svg" alt="Logo" />
        </div>
        <h1 className="animated-title">Շուտով․․․</h1>
        <p>Շուտով պատրաստ կլինի :) </p>
        <br/>
        <button className="pulsate-button" onClick={()=>{navigate("/")}} >Home</button>
      </div>
      </div>
    </div>
  );
};

export default Snack;
