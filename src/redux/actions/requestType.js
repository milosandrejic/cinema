import {dispatchMethod} from "../reduxUtility";
import * as requestActionType from '../requestTypeActionTypes';


export const changeRequestType = (type) => async (dispatch) => {
  dispatchMethod(requestActionType.SET_REQUEST_TYPE, type, dispatch);
}