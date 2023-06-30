import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './pagination.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const generatePageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);
        let startPage = currentPage - halfVisiblePages;
        let endPage = currentPage + halfVisiblePages;

        if (startPage < 1) {
          startPage = 1;
          endPage = maxVisiblePages;
        }

        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = totalPages - maxVisiblePages + 1;
        }

        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
      }

      setPages(pageNumbers);
    };

    generatePageNumbers();
  }, [totalPages, currentPage]);

  return (
    <div className="pagination">
      <div className="pagination__buttons">
        <button
          className="pagination__button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        {pages.map((page, index) => (
          <button
            className={cn('pagination__button', {
              'pagination__button--selected': page === currentPage,
            })}
            key={index}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
        <button
          className="pagination__button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
};