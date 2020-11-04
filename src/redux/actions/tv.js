import {SEARCH_SHOW_API_REQUEST, TV_SHOW_API_REQUEST} from "../../services/tvShowsService";
import * as tvShowActionType from '../tvShowActionTypes';
import {dispatchMethod} from "../reduxUtility";
import * as requestType from '../../services/requestTypeService';

export const getTvShows = (type, requestPage) => async (dispatch) => {
  const response = await TV_SHOW_API_REQUEST(type, requestPage, null);
  const {results, page, total_pages: totalPages} = response.data;
  dispatchMethod(tvShowActionType.TV_LIST, results, dispatch);
  dispatchMethod(tvShowActionType.SET_TV_CURRENT_PAGE, page, dispatch);
  dispatchMethod(tvShowActionType.SET_TV_TOTAL_PAGES, totalPages, dispatch);
}

export const loadMoreShows = (type, requestPage) => async (dispatch) => {
  const response = await TV_SHOW_API_REQUEST(type, requestPage, null);
  const {results} = response.data;
  dispatchMethod(tvShowActionType.LOAD_MORE_SHOWS, results, dispatch);
}

export const getShowDetails = (id) => async (dispatch) => {
  const baseDetails = await TV_SHOW_API_REQUEST(null, null, id);
  const credits = await TV_SHOW_API_REQUEST(requestType.CREDITS, null, id);
  const videos = await TV_SHOW_API_REQUEST(requestType.VIDEOS, null, id);
  const results = {...baseDetails.data, ...credits.data, ...videos.data};
  dispatchMethod(tvShowActionType.TV_SHOW_DETAILS, results, dispatch);
}

export const clearShowDetails = () => (dispatch) => {
  dispatchMethod(tvShowActionType.CLEAR_SHOW_DETAILS, {}, dispatch);
}

export const getShowRecommendations = (id) => async (dispatch) => {
  const response = await TV_SHOW_API_REQUEST(requestType.RECOMMENDATIONS, null, id);
  const {results} = response.data;
  dispatchMethod(tvShowActionType.TV_SHOW_RECOMMENDATIONS, results, dispatch);
}

export const searchShow = (query) => async (dispatch) => {
  const response = await SEARCH_SHOW_API_REQUEST(query);
  const {results} = response.data;
  dispatchMethod(tvShowActionType.SEARCH_SHOW_QUERY, query, dispatch);
  dispatchMethod(tvShowActionType.SEARCH_SHOW, results, dispatch);
}


