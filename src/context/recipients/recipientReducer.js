import {GET_RECIPIENTS } from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_RECIPIENTS: 
      return {
        ...state,
        recipients: [...action.payload]
      }
  
    default:
      return state
  }
}