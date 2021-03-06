import React from 'react';
import './SearchResults.scss';
import ResultsGrid from "../results-grid/ResultsGrid";
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

const SearchResults = (props) => {

  const history = useHistory();

  const {movieResults, showResults, searchQuery} = props;

  const handleGoBack = () => {
    history.goBack();
  }

  return (
    <div className='SearchResults'
         style={{height: `${movieResults.length + showResults.length === 0 ? '100vh' : ''}`}}>
      <div className='SearchResults__header'>
        <div onClick={() => handleGoBack()} className='SearchResults__back-btn'>
          <span>&lsaquo; </span>
          Back
        </div>
        <p className='SearchResults__results-lenght'>Matched your search: {movieResults.length + showResults.length}</p>
        <p className='SearchResults__search-query'>Query: {searchQuery}</p>
      </div>
      <div className='divider'></div>
      <ResultsGrid/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  movieResults: state.movies.searchResults,
  showResults: state.tvShows.tvShowSearchResults,
  searchQuery: state.movies.searchQuery
})

export default connect(mapStateToProps)(SearchResults);