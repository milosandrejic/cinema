import * as requestActionType from '../requestTypeActionTypes';


const initialState = {
  type: 'both'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case requestActionType.SET_REQUEST_TYPE:
      return {
        type: action.payload
      }
    default:
      return state
  }
}