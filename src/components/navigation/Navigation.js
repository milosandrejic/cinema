import React, {useEffect, useRef, useState} from 'react';

import logo from '../../assets/logo.png';
import './Navigation.scss';
import {NavLink} from "react-router-dom";

const Navigation = () => {

  const searchBox = useRef();
  const nav = useRef();
  const searchField = useRef();
  const [searchExpanded, setSearchExpanded] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => handleNavigationBackground());
    document.addEventListener('click', (e) => expandSearchForm(e));
    window.addEventListener('resize', () => checkScreenSize());

    return () => {
      document.removeEventListener('click', expandSearchForm);
      document.removeEventListener('scroll', handleNavigationBackground);
      window.removeEventListener('resize', checkScreenSize);
    }
  });


  const checkScreenSize = () => {
    if (searchExpanded) {
      if (window.matchMedia('(min-width: 1001px)').matches) {
        searchBox.current.style.width = '30rem';
      } else if (window.matchMedia('(max-width: 1000px)').matches) {
        searchBox.current.style.width = '25rem';
      }
    }
  }

  const handleNavigationBackground = () => {
    if (window.scrollY > 100) {
      nav.current.style.backgroundSize = '100% 1000%'
    } else {
      nav.current.style.backgroundSize = '100% 100%';
    }
  };

  const expandSearchForm = (e) => {
    if (e.target.matches('.search-box__icon')) {
      if (window.matchMedia('(min-width: 1001px)').matches) {
        searchBox.current.style.width = '30rem';
      } else if (window.matchMedia('(max-width: 1000px)').matches) {
        searchBox.current.style.width = '25rem';
      }
      searchBox.current.style.background = 'rgba(0,0,0, 0.4)';
      searchBox.current.style.border = '1px solid white';
      searchField.current.focus();
      setSearchExpanded(true);
    } else if (searchExpanded && !e.target.matches('.search-box__input')) {
      searchBox.current.style.width = '3rem';
      searchBox.current.style.background = 'transparent';
      searchBox.current.style.border = 'none';
      searchField.current.value=''
      setSearchExpanded(false);
    }
  }


  return (
    <div ref={nav} className='Navigation'>
      <nav className='Navigation__nav'>
        <div className='Navigation__logo-box'>
          <img className='Navigation__logo' src={logo} alt='Logo'/>
        </div>
        <ul className='Navigation__nav-list'>
          <li className='Navigation__nav-mobile'>
            Browse
            <i className='fas fa-angle-double-down' style={{marginLeft: '5px'}}></i>
          </li>
          <div className='Navigation__mobile-dropdown'>
            <li className='Navigation__nav-item'>
              <NavLink exact to='/' className='Navigation__nav-link'
                       activeClassName='Navigation__nav-link-active'>Home</NavLink>
            </li>
            <li className='Navigation__nav-item'>
              <NavLink exact to='/tv-shows' className='Navigation__nav-link'
                       activeClassName='Navigation__nav-link-active'>Tv Shows</NavLink>
            </li>
            <li className='Navigation__nav-item'>
              <NavLink exact to='/movies' className='Navigation__nav-link'
                       activeClassName='Navigation__nav-link-active'>Movies</NavLink>
            </li>
          </div>
        </ul>
      </nav>
      <div ref={searchBox} className='search-box'>
        <span className='fas fa-search search-box__icon'></span>
        <input ref={searchField} type='text' className='search-box__input'
               placeholder='Movies, TV Shows'/>
      </div>
    </div>
  )
}

export default Navigation;