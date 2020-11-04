import {combineReducers} from "redux";
import movieReducer from './movieReducer';
import tvShowReducer from './tvShowReducer';
import errorReducer from './errorReducer';
import utilityReducer from "./utilityReducer";

const reducers = combineReducers({
    movies: movieReducer,
    tvShows: tvShowReducer,
    utility: utilityReducer,
    error: errorReducer
});

export default reducers;