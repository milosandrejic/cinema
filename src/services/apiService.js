import * as requestTypeService from './requestTypeService';

export const API_KEY = '1ffb7c44eec887e8ed8ea3a090966351';
export const BASE_API_URL = 'https://api.themoviedb.org/3';
export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p';
export const INITIAL_REQUEST_OPTION_INDEX = 1;


export const constructImageUrl = (size, path) => {
  return `${BASE_IMAGE_URL}/${size}/${path}`;
}

export const posterImageSizes = {
  small: 'w92',
  medium: 'w342',
  original: 'original'
}

export const API_REQUESTS_OPTIONS = [
  {
    title: 'Top rated',
    value: 'top_rated',
    type: requestTypeService.BOTH
  },
  {
    title: 'Popular',
    value: 'popular',
    type: requestTypeService.BOTH
  },
  {
    title: 'Now playing',
    value: 'now_playing',
    type: requestTypeService.MOVIE
  },
  {
    title: 'Upcoming',
    value: 'upcoming',
    type: requestTypeService.MOVIE
  },
  {
    title: 'On the air',
    value: 'on_the_air',
    type: requestTypeService.SHOW
  }
];