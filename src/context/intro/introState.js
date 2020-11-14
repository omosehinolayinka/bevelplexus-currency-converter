import React, { useReducer } from 'react';
import IntroContext from './introContext';
import IntroReducer from './introReducer';
import {
  SHOW_INTRO,
  HIDE_INTRO
} from '../types'

const IntroState =  props => {
  const defaultState = {
    introStatus: true,
  }

  const [state, dispatch] = useReducer(IntroReducer, defaultState);

  // show intro
  const showIntro = () => dispatch({type: SHOW_INTRO, payload: true});

  //hide intro
  const hideIntro = () => dispatch({type: HIDE_INTRO, payload: false})

  return <IntroContext.Provider
    value = {{
      introStatus: state.introStatus,
      showIntro,
      hideIntro
    }}
  >
    {props.children}
  </IntroContext.Provider>
}

export default IntroState