import { useEffect, useState, FC } from 'react';

interface IPaginationProps {
  totalPages: number;
  countElement: string;
  currentPage: (page: number, size: number) => void
}

export const Pagination: FC<IPaginationProps> = ({ totalPages, currentPage, countElement }) => {
  const [count, setCount] = useState<number>(1);
  const [option, setOption] = useState(50);

  const getPage = (el: number) => {
    if (el < 1) {
      setCount(1);
      return;
    } else if (el > totalPages) {
      setCount(totalPages)
    } else {
      setCount(el)
    }
  }

  useEffect(() => {
    if (count > totalPages) {
      setCount(totalPages)
    } else {
      setCount(count)
    }
    currentPage(count, option);
  }, [count, option, totalPages]);

  const renderPageNumbers = (number: number) => {
    const pageNumbers = [];
    const maxVisiblePages = number;
    const middlePage = Math.ceil(maxVisiblePages / 2);
    let startPage = Math.max(1, count - middlePage + 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (count <= middlePage) {
      endPage = maxVisiblePages;
    } else if (count > totalPages - middlePage) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={i === count ? "page-item active w-[50px]" : "page-item w-[50px]"}
          onClick={() => setCount(i)}
        >
          <a className="page-link" href="#">
            <span>{i}</span>
          </a>
        </li>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <li key="dotsStart" className="page-item"><a className="page-link" href="#">
          {/* <span key="start" onClick={() => currentPage(1, option)}>1</span> */}
          <span>...</span>
        </a></li>
      );
      if (startPage > 2) {
        pageNumbers.unshift(
          <li key="Start" className="page-item"><a className="page-link" href="#">
            <span onClick={() => currentPage(1, option)}>1</span>
            {/* <span key="dots-start">...</span> */}
          </a></li>
        );
      }
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <li key="DotsEnd" className="page-item"><a className="page-link" href="#">
            <span>...</span>
          </a></li>
        );
      }
      pageNumbers.push(
        <li key="End" className="page-item"><a className="page-link" href="#">
          <span onClick={() => currentPage(totalPages, option)}>{totalPages}</span>
        </a></li>
      );
    }

    return pageNumbers;
  };

  // useEffect(() => {
  //   if (count > totalPages) {
  //     setCount(totalPages)
  //   } else {
  //     setCount(count)
  //   }
  // }, [totalPages]);

  return (
    <>
      <div className='d-inline-flex'>
        <select onChange={(e) => setOption(parseInt(e.target.value))} className="form-select w-[70px] form-select-md mr-2 text-primary">
          <option >10</option>
          <option >30</option>
          <option >50</option>
        </select>


        <ul className="pagination pagination-md justify-content-end">
          <li className="page-item" key="PreviousAll">
            <a className="page-link" href="#" onClick={() => setCount(1)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item" key="PreviousOne" >
            <a className="page-link" href="#" onClick={(e) => getPage(count - 1)}>
              <span aria-hidden="true">&lsaquo;</span>
            </a>
          </li>
          {renderPageNumbers(parseInt(countElement))}
          <li className="page-item" key="NextOne">
            <a className="page-link" href="#" onClick={(e) => getPage(count + 1)}>
              <span aria-hidden="true">&rsaquo;</span>
            </a>
          </li>
          <li className="page-item" key="NextAll">
            <a className="page-link" href="#" onClick={(e) => setCount(totalPages)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>

      </div>

    </>

  );
}



