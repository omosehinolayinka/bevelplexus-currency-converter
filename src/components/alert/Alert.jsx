import React from "react";
import { Link } from "react-router-dom";

import "./Alert.scss";

function Alert({ type, title, body, action }) {
  return (
    <div id='alert'>
      <div className='box'>
        <Link to='/payment/review'>
          <button className='secondary' onClick={action}>
            <span className='material-icons'>clear</span>
          </button>
        </Link>

        <div className='wrap'>
          {type === "error" ? (
            <p className='icon danger'>
              <span className='material-icons danger'>priority_high</span>
            </p>
          ) : (
            <p className='icon success'>
              <span className='material-icons success'>done</span>
            </p>
          )}
          <h2 className='heading'> {title} </h2>
          <p className='body'> {body} </p>
        </div>
      </div>
    </div>
  );
}

export default Alert;
