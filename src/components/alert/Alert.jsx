import React, { useContext } from "react";
import * as Scroll from "react-scroll";
import { Link } from "react-router-dom";

import AlertContext from "../../context/alert/alertContext";

import "./Alert.scss";

function Alert() {
  let Anchor = Scroll.Link;

  const alertContext = useContext(AlertContext);
  const props = alertContext.state;

  if (props.alertStatus === true) {
    return (
      <div id='alert'>
        <div className='box'>
          <div className='wrap'>
            {props.type === "error" ? (
              <p className='icon danger'>
                <span className='material-icons danger'>priority_high</span>
              </p>
            ) : props.type === "warning" ? (
              <p className='icon warning'>
                <span className='material-icons warning'>error</span>
              </p>
            ) : (
              <p className='icon success'>
                <span className='material-icons success'>done</span>
              </p>
            )}
            <h2 className='heading'> {props.title} </h2>
            <p className='body'> {props.body} </p>
            {props.anchor ? (
              <Anchor
                to={props.anchor.target}
                smooth={props.anchor.smooth}
                duration={props.anchor.duration}
              >
                <button className='primary' onClick={props.action}>
                  Proceed
                </button>
              </Anchor>
            ) : props.link ? (
              <Link to={props.link.route}>
                <button className='primary' onClick={props.action}>
                  Proceed
                </button>
              </Link>
            ) : (
              <button className='primary' onClick={props.action}>
                Proceed
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <React.Fragment></React.Fragment>;
}

export default Alert;
