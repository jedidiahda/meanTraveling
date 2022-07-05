import React, { useEffect, useState } from 'react';


type Props = {
  totalDocs: number,
  onPageChange:Function,
}

export default function({ totalDocs,onPageChange }:Props) {
  let [currentPage,setCurrentPage] = useState<number>(0);
  let [totalPages,setTotalPages] = useState<number>(0);
  let [docs,setDocs] = useState<number>(0);

  useEffect(() => {
    // console.log('effect');
   
    let total = Math.ceil(totalDocs / parseInt(process.env.REACT_APP_ROWS_PER_PAGE || '',10));
    // console.log('docs',docs);
    // console.log('totaldocs',totalDocs);
    if(docs != totalDocs){
      // setTimeout(() => {
        setCurrentPage(0);
        setDocs(totalDocs);
        setTotalPages(total);
        
      // },10)
    }
  });

  const onPrevious = () => {
    if(currentPage > 0){
      currentPage = currentPage -1;
      setCurrentPage(currentPage);
      onPageChange(currentPage);
    }
  }

  const onNext = () => {
    console.log('onnext');
    if(currentPage < totalPages){
      currentPage = currentPage + 1;
      setCurrentPage(currentPage);
      onPageChange(currentPage);
    }
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" disabled={currentPage <= 0} onClick={() => onPrevious()}>Previous</button>
        </li>
        <li className="page-item">
          <button className="page-link" disabled={currentPage == totalPages-1} onClick={() => onNext() }>Next</button>
        </li>
      </ul>
    </nav>
  );
}
