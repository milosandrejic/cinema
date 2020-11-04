import axios from 'axios';
import {API_KEY, BASE_API_URL} from "./apiService";

export const MOVIE_API_REQUEST = async (type = null, page = 1, movieId = null) => {
    return await axios.get(parseRequestUrl(type, page, movieId));
};

export const SEARCH_MOVIE_API_REQUEST = async (query) => {
    return await axios.get(SEARCH_MOVIE_REQUEST_URL(query));
}

const parseRequestUrl = (type, page, movieId) => {
    return `${BASE_API_URL}/movie${movieId ? `/${movieId}` : ''}${type ? `/${type}` : ''}?api_key=${API_KEY}&language=en-US${page ? `&page=${page}` : ``}`;
}

const SEARCH_MOVIE_REQUEST_URL = (query) => {
    return `${BASE_API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;
}

