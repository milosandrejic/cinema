import React, {useEffect, useState} from 'react';

import './Header.scss';
import Navigation from "../../components/navigation/Navigation";
import {Link} from "react-router-dom";
import {constructImageUrl, posterImageSizes} from "../../services/apiService";


const Header = (props) => {

  const {content} = props;

  const [currentMovieIndex, setCurrentMovieIndex] = useState(Math.floor(Math.random() / content.length))

  const {title, overview, backdrop_path, id, poster_path} = content[currentMovieIndex];

  const backImagePath = window.innerWidth < 600 ? constructImageUrl(posterImageSizes.medium, poster_path) : constructImageUrl(posterImageSizes.original, backdrop_path);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex(Math.floor(Math.random() * content.length));
    }, 5000)
    return () => clearInterval(interval);
  }, [currentMovieIndex])

  return (
    <div className='Header' style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backImagePath})`,
      backgroundSize: 'cover'
    }}>
      <div className='Header__movie'>
        <h2 className='Header__movie-name'>{title ? title : content[currentMovieIndex].name}</h2>
        <p className='Header__movie-desc'>{overview}</p>
        <Link to={`/details/movie/${id}`} className='Header__movie-info'>
          Info
          <i className='fas fa-info'></i>
        </Link>
      </div>
    </div>
  )
}

export default Header;