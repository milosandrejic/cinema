import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import * as requestTypes from '../../services/requestTypeService';
import './MainContent.scss';
import Pagination from "../../components/pagination/Pagination";
import {API_REQUESTS_OPTIONS, INITIAL_REQUEST_OPTION_INDEX} from "../../services/apiService";
import {getMovies, loadMoreMovies} from "../../redux/actions/movie";
import {getTvShows, loadMoreShows} from "../../redux/actions/tv";
import ResultsGrid from "../../components/results-grid/ResultsGrid";
import {changeRequestType} from "../../redux/actions/utilityActions";
import useDidUpdate from "../../components/custom-hooks/useDidUpdate";

const MainContent = (props) => {

  const {movies, shows} = props;
  const {getMovies, getTvShows, loadMoreMovies, loadMoreShows} = props;
  const {movieTotalPages, showTotalPages} = props;
  const {requestType} = props;


  const [activeRequestOptionIndex, setActiveRequestOptionIndex] = useState(INITIAL_REQUEST_OPTION_INDEX);
  const [movieList, setMovieList] = useState(movies);
  const [tvList, setTvList] = useState(shows);
  const resultListBottomLine = useRef();
  const [infiniteScrollRequestPage, setInfiniteScrollRequestPage] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const handleOptionRequestChange = (index) => {
    setActiveRequestOptionIndex(index);
    setCurrentPage(1);
  }

  useEffect(() => {
    switch (requestType) {
      case requestTypes.MOVIE:
        setTotalPages(movieTotalPages)
        break;
      case requestTypes.SHOW:
        setTotalPages(showTotalPages)
        break;
      default:
        setTotalPages(movieTotalPages < showTotalPages ? movieTotalPages : showTotalPages);
        break;
    }
    // eslint-disable-next-line
  }, [movieTotalPages, showTotalPages])

  useEffect(() => {
    switch (requestType) {
      case requestTypes.MOVIE:
        setMovieList(movies);
        setTvList(null)
        break;
      case requestTypes.SHOW:
        setTvList(shows);
        setMovieList(null)
        break;
      default:
        setMovieList(movies);
        setTvList(shows);
        break;
    }
    // eslint-disable-next-line
  }, [movies, shows])


  useDidUpdate(() => {
    switch (API_REQUESTS_OPTIONS[activeRequestOptionIndex].type) {
      case requestTypes.MOVIE:
        getMovies(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, currentPage);
        break;
      case requestTypes.SHOW:
        getTvShows(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, currentPage);
        break;
      default:
        getMovies(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, currentPage);
        getTvShows(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, currentPage);
        break;
    }
  }, [activeRequestOptionIndex])


  useDidUpdate(() => {
    switch (requestType) {
      case requestTypes.MOVIE:
        getMovies(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, currentPage);
        break;
      case requestTypes.SHOW:
        getTvShows(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, currentPage);
        break;
      default:
        getMovies(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, currentPage);
        getTvShows(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, currentPage);
        break;
    }
  }, [currentPage, requestType])

  const changePage = (type) => {
    if (type === 'next') {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  })

  const handleInfiniteScroll = () => {
    let pageNumber = infiniteScrollRequestPage + 1;
    if (resultListBottomLine.current.getBoundingClientRect().top <= window.innerHeight) {
      switch (requestType) {
        case requestTypes.BOTH:
          loadMoreMovies(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, pageNumber);
          loadMoreShows(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, pageNumber);
          setInfiniteScrollRequestPage(pageNumber)
          break;
        case requestTypes.MOVIE:
          loadMoreMovies(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, pageNumber);
          setInfiniteScrollRequestPage(pageNumber)
          break;
        case requestTypes.SHOW:
          loadMoreShows(API_REQUESTS_OPTIONS[activeRequestOptionIndex].value, pageNumber);
          setInfiniteScrollRequestPage(pageNumber)
          break;
        default:
          break;
      }
    }
  }


  return (
    <div className='MainContent'>
      <div className='MainContent__header'>
        <Pagination clicked={changePage} currentPage={currentPage} totalPages={totalPages}/>
        <div className='MainContent__dropdown'>
          <p className='MainContent__dropdown-item-active'>
            {API_REQUESTS_OPTIONS[activeRequestOptionIndex].title}
            <i className='fas fa-chevron-down MainContent__dropdown-icon'></i>
          </p>
          <ul className='MainContent__dropdown-list'>
            {
              // eslint-disable-next-line
              API_REQUESTS_OPTIONS.map((option, index) => {
                  if (index !== activeRequestOptionIndex) {
                    if (requestType === 'both') {
                      return <li key={index} onClick={() => handleOptionRequestChange(index)}
                                 className='MainContent__dropdown-list-item'>{option.title}</li>
                    } else {
                      if (requestType === option.type || option.type === 'both') {
                        return <li key={index} onClick={() => handleOptionRequestChange(index)}
                                   className='MainContent__dropdown-list-item'>{option.title}</li>
                      }
                    }
                  }
                }
              )
            }
          </ul>
        </div>
      </div>
      <ResultsGrid movies={movieList} shows={tvList}/>
      <div ref={resultListBottomLine}></div>
    </div>
  )
}

const mapStateToProps = state => ({
  movies: state.movies.movieList,
  shows: state.tvShows.tvList,
  movieCurrentPage: state.movies.page,
  movieTotalPages: state.movies.totalPages,
  showCurrentPage: state.tvShows.page,
  showTotalPages: state.tvShows.totalPages,
  requestType: state.utility.type
})

const mapDispatchToProps = {
  getMovies,
  getTvShows,
  changeRequestType,
  loadMoreShows,
  loadMoreMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);