import { useEffect, useState, FC } from "react"
import { DB_URL_USERS } from "../data/_secret";
import { IUser, IUserData } from "../models";
import { Link } from 'react-router-dom';
import { useDelete } from "../hooks/useDelete";
import { Loader } from "../components/Loader";
import { ErrorMesage } from "../components/ErrorMesage";
import { AxiosError } from 'axios';
import { Pagination } from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";
import { Table } from "../components/Table";

const Users: FC<IUserData> = () => {
  const [size, setSize] = useState<number>(50);
  const [page, setPage] = useState<number>(1);

  const currentPage = (page: number, size: number) => {
    setPage(page);
    setSize(size);
  }
    
  const { loading, error, status, deleteItem } = useDelete();
  const { users, loading: loadingData, error: errorData, pagination } = usePagination();

  //console.log(loadingData)

  useEffect(() => {
    pagination(page, size);
  }, [page, size, status]);

  const { data, pageSize, totalCount, totalPages } = users;

  const handleDelete = (user: IUser) => {
    deleteItem(user.id, DB_URL_USERS);
  }


  return (
    <div className="container " >
      <h1>{ loadingData }</h1>
      {loadingData && <Loader />}
      {error && <ErrorMesage error={error} />}
      
      <Pagination totalPages={totalPages} currentPage={currentPage} countElement="9" />
      <Table data={ data } handleDelete={ handleDelete } />
    </div>
  )
}

export default Users