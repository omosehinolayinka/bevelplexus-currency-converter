import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Intro.scss";

import IntroContext from "../../context/intro/introContext";

function Intro({ title, number, message, next, position, end }) {
  const introContext = useContext(IntroContext);

  return (
    introContext.introStatus && (
      <div id='intro' style={{display: 'none'}}>
        <div className='box' style={{ top: `${position - 60}px` }}>
          <div className='wrap'>
            <div className='heading'>
              <p> {title} </p>
              <p> {number} </p>
            </div>

            <div className='body'>
              <p> {message} </p>
            </div>

            <div className='footer'>
              <p onClick={() => introContext.hideIntro()}> Skip Tour</p>
              <Link to={next} onClick={() => end && introContext.hideIntro()}>
                Next
              </Link>
            </div>
          </div>

          <div className='pointer'></div>
          <div className='border'></div>
        </div>
      </div>
    )
  );
}

export default Intro;
