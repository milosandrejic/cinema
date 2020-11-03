import React from 'react';

import './Pagination.scss';

const Pagination = (props) => {

  const {currentPage, totalPages, clicked} = props;


  return (
    <div className='Pagination'>
      <button disabled={currentPage < 2} className='Pagination__btn' onClick={() => clicked('prev')}>Prev</button>
      <button disabled={currentPage === totalPages - 1} className='Pagination__btn'
              onClick={() => clicked('next')}>Next
      </button>
      <p className='Pagination__page-info'>{currentPage} - {totalPages}</p>
    </div>
  )
}

export default Pagination;