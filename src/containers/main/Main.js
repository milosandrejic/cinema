import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Header from "../header/Header";
import MainContent from "../main-content/MainContent";
import {getMovies} from "../../redux/actions/movie";
import {getTvShows} from "../../redux/actions/tv";
import {changeRequestType} from "../../redux/actions/requestType";
import {API_REQUESTS_OPTIONS, INITIAL_REQUEST_OPTION_INDEX} from "../../services/apiService";
import Loader from "../../components/loader/Loader";
import * as requestTypeService from '../../services/requestTypeService';
import {useLocation} from 'react-router-dom';
import Navigation from "../../components/navigation/Navigation";
import MovieDetails from "../../components/movie-details/MovieDetails";

const Main = (props) => {

  const {getMovies, movies, getTvShows, tvShows, changeRequestType, type} = props;

  let location = useLocation();


  useEffect(() => {
    switch (location.pathname) {
      case '/':
        changeRequestType(requestTypeService.BOTH);
        break;
      case '/movies':
        changeRequestType(requestTypeService.MOVIE);
        break;
      case '/tv-shows':
        changeRequestType(requestTypeService.SHOW);
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    switch (type) {
      case requestTypeService.SHOW:
        getTvShows(API_REQUESTS_OPTIONS[INITIAL_REQUEST_OPTION_INDEX].value, 1);
        break;
      case requestTypeService.MOVIE:
        getMovies(API_REQUESTS_OPTIONS[INITIAL_REQUEST_OPTION_INDEX].value, 1);
        break;
      default:
        getMovies(API_REQUESTS_OPTIONS[INITIAL_REQUEST_OPTION_INDEX].value, 1);
        getTvShows(API_REQUESTS_OPTIONS[INITIAL_REQUEST_OPTION_INDEX].value, 1);
        break;
    }
    // eslint-disable-next-line
  }, [type])

  return (
    <>
      {movies.length !== 0 || tvShows.length !== 0 ?
        <div>
          <Navigation/>
          {location.pathname.startsWith('/details') ?
            <MovieDetails/>
            :
            <>
              <Header
                content={type === requestTypeService.BOTH || type === requestTypeService.MOVIE ? movies : tvShows}/>
              <MainContent/>
            </>
          }
        </div>
        :
        <Loader/>}
    </>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies.movieList,
  tvShows: state.tvShows.tvList
})

const mapDispatchToProps = {
  getMovies,
  getTvShows,
  changeRequestType
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);