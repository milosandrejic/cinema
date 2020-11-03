import React from 'react';
import './ResultsGrid.scss';

import MovieCard from "../movie-card/MovieCard";
import {v4} from "uuid";

const ResultsGrid = (props) => {

  const {movies, shows} = props;

  return (
    <div className='ResultsGrid'>
      {movies && movies.map(movie => {
        return <MovieCard key={v4()} movieData={movie}/>
      })}
      {
        shows && shows.map(show => {
          return <MovieCard key={v4()} showData={show}/>
        })
      }
    </div>
  )
}

export default ResultsGrid;