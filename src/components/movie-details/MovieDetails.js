import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {getMovieDetails, clearMovieDetails, getMovieRecommendations} from "../../redux/actions/movie";
import {getShowDetails, clearShowDetails, getShowRecommendations} from "../../redux/actions/tv";

import './MovieDetails.scss';
import {constructImageUrl, posterImageSizes} from "../../services/apiService";
import ReactPlayer from "react-player";
import MovieCard from "../movie-card/MovieCard";

const MovieDetails = (props) => {

  const {getMovieDetails, getShowDetails, clearMovieDetails, clearShowDetails, getMovieRecommendations, getShowRecommendations} = props;
  const {movieDetails, showDetails, movieRecommendations, tvShowRecommendations} = props;
  const {id} = useParams();
  const [details, setDetails] = useState(null);
  const [recommendations, setRecommendations] = useState();
  const url = useLocation();

  let starsArray = [...Array(10)];

  useEffect(() => {
    if (url.pathname.startsWith('/details/movie')) {
      getMovieDetails(id);
      getMovieRecommendations(id);
    } else if (url.pathname.startsWith('/details/show')) {
      getShowDetails(id);
      getShowRecommendations(id);
    }
    window.scrollTo(0, 0)
    return () => {
      if (url.pathname.startsWith('/details/movie')) {
        clearMovieDetails();
      } else if (url.pathname.startsWith('/details/show')) {
        clearShowDetails();
      }
    }
  }, [id]);

  useEffect(() => {
    setDetails(movieDetails)
    setRecommendations(movieRecommendations);
    return () => {
      setDetails(null);
      setRecommendations(null);
    }
  }, [movieDetails, movieRecommendations])

  useEffect(() => {
    setDetails(showDetails)
    setRecommendations(tvShowRecommendations);
    return () => {
      setDetails(null);
      setRecommendations(null);
    }
  }, [showDetails, tvShowRecommendations])

  return (
    <>
      {details &&
      <div className='MovieDetails'>
        <div className='MovieDetails__header'
             style={{background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${constructImageUrl(posterImageSizes.original, details.backdrop_path)})`}}>
          <div className='MovieDetails__poster'
               style={{background: `url(${constructImageUrl(posterImageSizes.original, details.poster_path)})`}}></div>
          <div className='MovieDetails__heading'>
            <h2 className='MovieDetails__name'>{details.title ? details.title : details.name} <span
              className='MovieDetails__date'>{details.release_date}</span></h2>
            <ul className='MovieDetails__genre-list'>
              {details.genres && details.genres.map((genre, i) => <li key={i}
                                                                      className='MovieDetails__genre-item'>{genre.name}</li>)}
            </ul>
            <div className='MovieDetails__rating-container'>
              <ul className='MovieDetails__star-list'>
                {
                  starsArray.map((star, i) => {
                    const goldStars = Math.floor(details.vote_average);
                    const halfStars = details.vote_average - goldStars;
                    if (goldStars > i) {
                      return (
                        <li key={i} className='MovieDetails__star'>
                          <i className='fas fa-star' style={{color: 'gold'}}></i>
                        </li>
                      )
                    } else if (goldStars === i && halfStars > 0) {
                      return (
                        <li key={i} className='MovieDetails__star'>
                          <i className='fas fa-star-half' style={{color: 'gold'}}></i>
                        </li>
                      )
                    }

                  })
                }
              </ul>
              <p className='MovieDetails__rating'>{details.vote_average} ({details.vote_count}) reviews</p>
            </div>
          </div>
        </div>
        <div className='MovieDetails__content'>
          <p className='MovieDetails__overview'>{details.overview}</p>
          <div className='divider'></div>
          <div className='MovieDetails__team-container'>
            {(details.cast && details.cast.length > 0) && <div className='MovieDetails__team'>
              <h3 className='MovieDetails__team-title'>Cast</h3>
              {
                details.cast.map(cast => (
                  <div className='MovieDetails__person-container' key={cast.id}>
                    <div className='MovieDetails__person-image'
                         style={{background: `url(${constructImageUrl(posterImageSizes.small, cast.profile_path)})`}}></div>
                    <p className='MovieDetails__person-name'>{cast.name}</p>
                    <p className='MovieDetails__person-character'>{cast.character}</p>
                  </div>
                ))
              }
            </div>}
            {(details.crew && details.crew.length > 0) &&
            <div className='MovieDetails__team'>
              <h3 className='MovieDetails__team-title'>Crew</h3>
              {
                details.crew && details.crew.map(crew => (
                  <div className='MovieDetails__person-container' key={crew.credit_id}>
                    <p className='MovieDetails__person-name'>{crew.name}</p>
                    <p className='MovieDetails__person-character'>{crew.department}</p>
                  </div>
                ))
              }

            </div>
            }
          </div>
          {(details.results && details.results.length > 0) &&
          <>
            <div className='divider'></div>
            <div className='MovieDetails__media-container'>
              <h2 className='MovieDetails__section-title'>Trailer</h2>
              <div className='MovieDetails__video-container'>
                <ReactPlayer light controls={true} width='100%' height='100%'
                             url={`https://www.youtube.com/watch?v=${details.results[0].key}`}/>
              </div>
            </div>
          </>
          }
          <div className='divider'></div>
          <div className='MovieDetails__recommendations'>
            <h2 className='MovieDetails__section-title'>Recommendations</h2>
            <div className='MovieDetails__recommendations-container'>
              {recommendations && recommendations.map((recommendation, i) => {
                if (i < 10) {
                  return <MovieCard key={i}
                                    movieData={url.pathname.startsWith('/details/movie') ? recommendation : null}
                                    showData={url.pathname.startsWith('/details/show') ? recommendation : null}/>
                }
              })}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

const mapStateToProps = (state) => ({
  movieDetails: state.movies.movieDetails,
  movieRecommendations: state.movies.recommendedMovies,
  showDetails: state.tvShows.tvShowDetails,
  tvShowRecommendations: state.tvShows.tvShowRecommendations
})

const mapDispatchToProps = {
  getMovieDetails,
  getShowDetails,
  clearMovieDetails,
  clearShowDetails,
  getMovieRecommendations,
  getShowRecommendations
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);