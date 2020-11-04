import {dispatchMethod} from "../reduxUtility";
import * as requestActionType from '../utilityActionTypes';


export const changeRequestType = (type) => async (dispatch) => {
  dispatchMethod(requestActionType.SET_REQUEST_TYPE, type, dispatch);
}

export const setSearch = (isActive) => (dispatch) => {
  dispatchMethod(requestActionType.SET_SEARCH, isActive, dispatch);
}