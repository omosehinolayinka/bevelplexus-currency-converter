import React from "react";
import * as Scroll from 'react-scroll';

import "./Alert.scss";

function Alert({ type, title, body, action }) {
  let Anchor = Scroll.Link;

  return (
    <div id='alert'>
      <div className='box'>

        <div className='wrap'>
          {type === "error" ? (
            <p className='icon danger'>
              <span className='material-icons danger'>priority_high</span>
            </p>
          ) : type === 'warning' ? (
            <p className='icon warning'>
              <span className='material-icons warning'>error</span>
            </p>
          ) : (
            <p className='icon success'>
              <span className='material-icons success'>done</span>
            </p>
          )}
          <h2 className='heading'> {title} </h2>
          <p className='body'> {body} </p>

          <Anchor to='paymentInstructions' smooth={true} duration={1000}>
            <button className="primary" onClick={action}>Proceed</button>
          </Anchor>
          {/* <button className="primary" onClick={action}>Proceed</button> */}
        </div>
      </div>
    </div>
  );
}

export default Alert;
