import React from 'react';
import './ResultsGrid.scss';
import {connect} from 'react-redux';

import MovieCard from "../movie-card/MovieCard";
import {v4} from "uuid";

const ResultsGrid = (props) => {

  const {movies, shows, movieSearchResults, tvShowSearchResults, searchActive} = props;

  return (
    <>
      {
        searchActive ?
          <div className='ResultsGrid'>
            {movieSearchResults && movieSearchResults.map(movie => {
              if (movie.poster_path) {
                return <MovieCard key={v4()} movieData={movie}/>
              }
              return null;
            })}
            {
              tvShowSearchResults && tvShowSearchResults.map(show => {
                if (show.poster_path) {
                  return <MovieCard key={v4()} showData={show}/>
                }
                return null;
              })
            }
          </div>
          :
          <div className='ResultsGrid'>
            {movies && movies.map(movie => {
              if (movie.poster_path) {
                return <MovieCard key={v4()} movieData={movie}/>
              }
              return null;
            })}
            {
              shows && shows.map(show => {
                if (show.poster_path) {
                  return <MovieCard key={v4()} showData={show}/>
                }
                return null;
              })
            }
          </div>
      }
    </>
  )
}

const mapStateToProps = (state) => ({
  movieSearchResults: state.movies.searchResults,
  tvShowSearchResults: state.tvShows.tvShowSearchResults,
  searchActive: state.utility.searchActive
})

export default connect(mapStateToProps)(ResultsGrid);