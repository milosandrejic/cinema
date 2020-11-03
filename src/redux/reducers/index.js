import {combineReducers} from "redux";
import movieReducer from './movieReducer';
import tvShowReducer from './tvShowReducer';
import errorReducer from './errorReducer';
import requestTypeReducer from "./requestTypeReducer";

const reducers = combineReducers({
    movies: movieReducer,
    tvShows: tvShowReducer,
    requestType: requestTypeReducer,
    error: errorReducer
});

export default reducers;