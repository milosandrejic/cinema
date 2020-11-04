import * as requestActionType from '../utilityActionTypes';


const initialState = {
  type: 'both',
  searchActive: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case requestActionType.SET_REQUEST_TYPE:
      return {
        ...state,
        type: action.payload
      }
    case requestActionType.SET_SEARCH:
      return {
        ...state,
        searchActive: action.payload
      }
    default:
      return state
  }
}