import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Header from "../header/Header";
import MainContent from "../main-content/MainContent";
import {getMovies} from "../../redux/actions/movie";
import {getTvShows} from "../../redux/actions/tv";
import {changeRequestType} from "../../redux/actions/utilityActions";
import {API_REQUESTS_OPTIONS, INITIAL_REQUEST_OPTION_INDEX} from "../../services/apiService";
import Loader from "../../components/loader/Loader";
import * as requestTypeService from '../../services/requestTypeService';
import {useLocation} from 'react-router-dom';
import Navigation from "../../components/navigation/Navigation";
import MovieDetails from "../../components/movie-details/MovieDetails";
import ResultsGrid from "../../components/results-grid/ResultsGrid";
import {setSearch} from "../../redux/actions/utilityActions";
import SearchResults from "../../components/search-result/SearchResults";

const Main = (props) => {

  const {getMovies, movies, getTvShows, tvShows, changeRequestType, type, searchActive, setSearch} = props;

  let location = useLocation();
  const [isSearchActive, setIsSearchActive] = useState(searchActive);

  useEffect(() => {
    setIsSearchActive(searchActive);
  }, [searchActive]);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        changeRequestType(requestTypeService.BOTH);
        setSearch(false);
        break;
      case '/movies':
        changeRequestType(requestTypeService.MOVIE);
        setSearch(false);
        break;
      case '/tv-shows':
        changeRequestType(requestTypeService.SHOW);
        setSearch(false);
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
      <Navigation/>
      {(movies.length !== 0 || tvShows.length !== 0) && !isSearchActive ?
        <div>
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
        <>
          {isSearchActive ? <SearchResults/> : <Loader/>}
        </>
      }
    </>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies.movieList,
  tvShows: state.tvShows.tvList,
  searchActive: state.utility.searchActive
})

const mapDispatchToProps = {
  getMovies,
  getTvShows,
  changeRequestType,
  setSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);