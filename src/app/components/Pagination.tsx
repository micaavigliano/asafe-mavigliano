import React from 'react';
import { GrFormPrevious } from "react-icons/gr";
import { MdSkipPrevious, MdSkipNext, MdNavigateNext } from "react-icons/md";
import Button from './Button';


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, nextPage, prevPage, goToPage }) => {
  const getPageNumbers = () => {
    const totalShownPages = 15;
    
    if (totalPages <= totalShownPages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    console.log(totalPages)

    const firstPage = 1;
    const lastPage = totalPages;
    
    const shouldShowLeftEllipsis = currentPage > 4;
    const shouldShowRightEllipsis = currentPage < totalPages - 3;

    const pagesAroundCurrent = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
      .filter(page => page > firstPage && page < lastPage);

    const pageNumbers = [
      firstPage,
      shouldShowLeftEllipsis ? 'left-ellipsis' : null,
      ...pagesAroundCurrent,
      shouldShowRightEllipsis ? 'right-ellipsis' : null,
    ];

    return pageNumbers.filter(Boolean);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="p-6 flex flex-col items-center text-neutral-950 dark:text-neutral-300">
      <div className='flex flex-row gap-3 max-[430px]:gap-1'>
        <Button
          variant='link'
          onClick={() => goToPage(0)}
          className='text-neutral-950 dark:text-neutral-300'
        >
          <MdSkipPrevious />
        </Button>
        <Button
          onClick={prevPage}
          disabled={currentPage === 0}
          variant='link'
        >
          <GrFormPrevious className='text-neutral-950 dark:text-neutral-300'/>
        </Button>
        <Button
          onClick={prevPage}
          disabled={currentPage === 0}
          key="prev-button"
          variant='link'
        >
          Previous
        </Button>
        {pageNumbers.map((number) => {
          if (number === 'left-ellipsis' || number === 'right-ellipsis') {
            return (
              <span key={number} className="ellipsis">
                ...
              </span>
            );
          }
          return (
            <Button
              key={`page-${number}`}
              onClick={() => goToPage(Number(number) - 1)}
              className={currentPage === Number(number) - 1 ? 'active' : ''}
              variant='link'
            >
              {number}
            </Button>
          );
        })}

        <Button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          key="next-button"
          variant="link"
        >
          Next
        </Button>
        <Button
          variant='link'
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
        >
          <MdNavigateNext className='text-neutral-950 dark:text-neutral-300' />
        </Button>
        <Button
          variant='link'
          onClick={() => goToPage(totalPages - 1)}
          className='text-neutral-950 dark:text-neutral-300'
        >
          <MdSkipNext />
        </Button>
      </div>
      <p>
        Page {currentPage + 1} of {totalPages}
      </p>
    </div>
  );
};

export default Pagination;