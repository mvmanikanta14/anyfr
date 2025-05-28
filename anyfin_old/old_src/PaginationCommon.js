import React from 'react';
import PropTypes from 'prop-types';
import { IconChevronsLeft ,IconChevronsRight } from '@tabler/icons-react';
const Pagination = ({ totalElements, recordsPerPage, pageNumber, onPageChange }) => {
  const totalPages = Math.ceil(totalElements / recordsPerPage);
  const maxVisiblePages = 3;

  const handleClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, pageNumber - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${pageNumber === i ? 'active' : ''}`}>
          <button onClick={() => handleClick(i)} className="page-link">
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handleClick(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
             <IconChevronsLeft size={15}   />
          </button>
        </li>
        {renderPageNumbers()}
        <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handleClick(pageNumber + 1)}
            disabled={pageNumber === totalPages}
          >
            <IconChevronsRight size={15} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalElements: PropTypes.number.isRequired,
  recordsPerPage: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
