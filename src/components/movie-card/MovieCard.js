import React, {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import './MovieCard.scss';
import {constructImageUrl, posterImageSizes} from "../../services/apiService";
import {setSearch} from "../../redux/actions/utilityActions";

const MovieCard = (props) => {

  const {movieData, showData, setSearch} = props;
  const {poster_path, vote_average, id} = movieData ? movieData : showData;
  const card = useRef();
  const history = useHistory();

  const title = movieData ? movieData.title : showData.name;

  const posterPath = constructImageUrl(posterImageSizes.medium, poster_path);

  const handleMouseOver = () => {
    card.current.style.background = `linear-gradient(rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url(${posterPath})`;
  }

  const handleMouseOut = () => {
    card.current.style.background = `url(${posterPath})`;
  }

  const pushToDetails = () => {
    setSearch(false);
    history.push(`/details/${movieData ? 'movie' : 'show'}/${id}`);
  }

  return (
    <div ref={card} onMouseOut={() => handleMouseOut()} onMouseOver={() => handleMouseOver()} className='MovieCard'
         style={{background: `url(${posterPath})`, backgroundSize: 'cover'}}>
      <div className='MovieCard__details-container'>
        <h2 className='MovieCard__details-title'>{title}</h2>
        <p className='MovieCard__details-rating'>{vote_average}/10</p>
        <button onClick={() => pushToDetails()} className='MovieCard__details-btn'>Details</button>
      </div>
    </div>
  )
}


export default connect(null, {setSearch})(MovieCard);