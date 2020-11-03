import {MOVIE_API_REQUEST, SEARCH_MOVIE_REQUEST_URL} from "../../services/movieService";
import * as movieActionType from '../movieActionTypes';
import {dispatchMethod} from "../reduxUtility";
import * as requestType from '../../services/requestTypeService';

export const getMovies = (type, requestPage) => async (dispatch) => {
  const response = await MOVIE_API_REQUEST(type, requestPage, null);
  const {results, page, total_pages: totalPages} = response.data;
  dispatchMethod(movieActionType.MOVIE_LIST, results, dispatch);
  dispatchMethod(movieActionType.SET_MOVIE_CURRENT_PAGE, page, dispatch);
  dispatchMethod(movieActionType.SET_MOVIE_TOTAL_PAGES, totalPages, dispatch);
}

export const loadMoreMovies = (type, requestPage) => async (dispatch) => {
  const response = await MOVIE_API_REQUEST(type, requestPage, null);
  const {results} = response.data;
  dispatchMethod(movieActionType.LOAD_MORE_MOVIES, results, dispatch);
}

export const getMovieDetails = (id) => async (dispatch) => {
  const baseDetails = await MOVIE_API_REQUEST(null, null, id);
  const credits = await MOVIE_API_REQUEST(requestType.CREDITS, null, id);
  const videos = await MOVIE_API_REQUEST(requestType.VIDEOS, null, id);
  const results = {...baseDetails.data, ...credits.data, ...videos.data};
  dispatchMethod(movieActionType.MOVIE_DETAILS, results, dispatch);
}

export const clearMovieDetails = () => (dispatch) => {
  dispatchMethod(movieActionType.CLEAR_MOVIE_DETAILS, {}, dispatch)
}

export const searchMovie = (query) => async (dispatch) => {
  const response = await SEARCH_MOVIE_REQUEST_URL(query);
  const results = response.data;
  dispatchMethod(movieActionType.SEARCH_QUERY, query, dispatch);
  dispatchMethod(movieActionType.SEARCH_MOVIE, results, dispatch);
}

export const getMovieRecommendations = (id) => async (dispatch) => {
  const response = await MOVIE_API_REQUEST(requestType.RECOMMENDATIONS, null, id);
  const {results} = response.data;
  dispatchMethod(movieActionType.MOVIE_RECOMMENDATIONS, results, dispatch);
}
