import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
  SHOW_ALERT,
  HIDE_ALERT
} from '../types'

const AlertState =  props => {
  const defaultState = {
    alertStatus: false,
    type: "error",
    title: "Alert",
    body: "An error occured",
    action() {
      console.log("Alert");
    }
  }

  const [state, dispatch] = useReducer(AlertReducer, defaultState);

  // show intro
  const showAlert = (params) => dispatch({type: SHOW_ALERT, payload: params});

  //hide intro
  const hideAlert = () => dispatch({type: HIDE_ALERT, payload: defaultState})

  return <AlertContext.Provider
    value = {{
      state,
      showAlert,
      hideAlert
    }}
  >
    {props.children}
  </AlertContext.Provider>
}

export default AlertState