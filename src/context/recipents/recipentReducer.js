import {GET_RECIPENTS, GET_RECIPENT} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_RECIPENTS: 
      return {
        ...state,
        recipents: [...action.payload]
      }
  
    default:
      return state
  }
}