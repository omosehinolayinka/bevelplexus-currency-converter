import {GET_RECIPIENTS, CHANGE_PAGE } from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_RECIPIENTS: 
      return {
        ...state,
        ...action.payload
      }
    
    case CHANGE_PAGE: 
      return {
        ...state,
        page: {...action.payload}
      }
  
    default:
      return state
  }
}