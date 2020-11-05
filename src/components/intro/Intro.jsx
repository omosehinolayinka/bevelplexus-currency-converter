import React from "react";
import { Link } from 'react-router-dom';
import "./Intro.scss";

function Intro({ title, number, message, next, position, showTips, end }) {

  return (
    <div id='intro' style={{display: 'none'}}>
      <div className='box' style={{top: `${position - 60}px` }}>
        <div className='wrap'>
          <div className="heading">
            <p> {title} </p>
            <p> {number} </p>
          </div>

          <div className="body">
            <p> {message} </p>
          </div>

          <div className="footer">
            <p onClick={() => showTips(false)}> Skip Tour</p>
            <Link to={next} onClick={() => end && showTips(false)}>Next</Link>
          </div>
        </div>

        <div className='pointer'></div>
        <div className="border"></div>
      </div>
    </div>
  );
}

export default Intro;
