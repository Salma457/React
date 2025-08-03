import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPagesToShow = 5;
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;
    
    if (currentPage <= maxPagesBeforeCurrent) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrent;
      endPage = currentPage + maxPagesAfterCurrent;
    }
  }

  const pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);

  return (
    <div className="pagination-container">
      <button
        className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FaChevronLeft className="arrow-icon" />
      </button>

      <div className="page-numbers">
        {pages.map(page => (
          <button
            key={page}
            className={`page-number ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : null}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FaChevronRight className="arrow-icon" />
      </button>
    </div>
  );
}

export default Pagination;