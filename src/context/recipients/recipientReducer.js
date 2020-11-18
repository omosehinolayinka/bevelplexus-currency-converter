import {GET_RECIPIENTS, GET_RECIPIENT} from '../types'

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