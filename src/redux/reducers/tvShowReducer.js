import * as tvShowActionType from '../tvShowActionTypes';

const initialState = {
  tvList: [],
  page: 1,
  totalPages: 0,
  tvShowDetails: {},
  tvShowRecommendations: [],
  tvShowSearchQuery: '',
  tvShowSearchResults: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case tvShowActionType.TV_LIST:
      return {
        ...state,
        tvList: action.payload
      }
    case tvShowActionType.SET_TV_CURRENT_PAGE:
      return {
        ...state,
        page: action.payload
      }
    case tvShowActionType.SET_TV_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload
      }
    case tvShowActionType.LOAD_MORE_SHOWS:
      return {
        ...state,
        tvList: [...state.tvList, ...action.payload]
      }
    case tvShowActionType.TV_SHOW_DETAILS:
      return {
        ...state,
        tvShowDetails: action.payload
      }
    case tvShowActionType.CLEAR_SHOW_DETAILS:
      return {
        ...state,
        tvShowDetails: action.payload
      }
    case tvShowActionType.TV_SHOW_RECOMMENDATIONS:
      return {
        ...state,
        tvShowRecommendations: action.payload
      }
    case tvShowActionType.SEARCH_SHOW_QUERY:
      return {
        ...state,
        tvShowSearchQuery: action.payload
      }
    case tvShowActionType.SEARCH_SHOW:
      return {
        ...state,
        tvShowSearchResults: action.payload
      }
    default:
      return state;
  }
}