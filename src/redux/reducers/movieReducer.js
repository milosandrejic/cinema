import * as movieActionType from '../movieActionTypes';

const initialState = {
  movieList: [],
  page: 1,
  totalPages: 0,
  movieDetails: {},
  searchResults: [],
  searchQuery: '',
  recommendedMovies: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case movieActionType.MOVIE_LIST:
      return {
        ...state,
        movieList: [...action.payload]
      }
    case movieActionType.SET_MOVIE_CURRENT_PAGE:
      return {
        ...state,
        page: action.payload
      }
    case movieActionType.SET_MOVIE_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload
      }
    case movieActionType.LOAD_MORE_MOVIES:
      return {
        ...state,
        movieList: [...state.movieList, ...action.payload]
      }
    case movieActionType.MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload
      }
    case movieActionType.SEARCH_MOVIE_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      }
    case movieActionType.CLEAR_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload
      }
    case movieActionType.SEARCH_MOVIE:
      return {
        ...state,
        searchResults: action.payload
      }
    case movieActionType.MOVIE_RECOMMENDATIONS:
      return {
        ...state,
        recommendedMovies: action.payload
      }

    default:
      return state;
  }
}