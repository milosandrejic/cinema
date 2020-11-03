import axios from 'axios';
import {API_KEY, BASE_API_URL} from "./apiService";

export const TV_SHOW_API_REQUEST = async (type = null, page = 1, showId = null) => {
  return await axios.get(parseRequestUrl(type, page, showId));
};

const parseRequestUrl = (type, page, showId) => {
  return `${BASE_API_URL}/tv${showId ? `/${showId}` : ''}${type ? `/${type}` : ''}?api_key=${API_KEY}&language=en-US${page ? `&page=${page}` : ``}`;
}

