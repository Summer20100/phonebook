import { useEffect, useState } from 'react';
import { Table } from '../components/Table/Table';
import { usePagination } from '../hooks/usePagination';

function AboutPage() {
  const { users, loading, error, pagination } = usePagination();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(50)

  // useEffect(() => {
  //   pagination(page, size);
  // }, [])

  
  return (
    <div className='container'>
      Тра та та та та та та та та та та та та та та
    </div>
  )
}

export default AboutPage