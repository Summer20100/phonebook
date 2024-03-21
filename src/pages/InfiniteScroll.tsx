import { useEffect, useState, FC } from "react"
import { DB_URL_USERS } from "../data/_secret";
import { IUser, IUserData } from "../models";
import { useDelete } from "../hooks/useDelete";
import { Loader } from "../components/Loader";
import { ErrorMesage } from "../components/ErrorMesage";
import { AxiosError } from 'axios';
import { usePagination } from "../hooks/usePagination";
import { useSearch } from '../hooks/useSearch';
import { Table } from "../components/Table";
import { Search } from "../components/Search";

const InfiniteScroll: FC<IUserData> = () => {
  const [size, setSize] = useState<number>(50);
  const [page, setPage] = useState<number>(1);
  const [nextSize, setNextSize] = useState<number>(size)
  const [nextPage, setNextPage] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersShow, setUsersShow] = useState<IUser[]>([]);

  const { loading: loadingDelete, error: errorDelete, status, deleteItem } = useDelete();
  const { users, loading: loadingData, error: errorData, pagination } = usePagination();
  const { users: usersSearch, loading: loadingSearch, error: errorSearch, search } = useSearch();



  const { data, pageSize, totalCount, totalPages } = users;

  // let data= [];

  // if (!usersSearch.data) {
  //   data.push(users.data)
  // } else {
  //   data.push(usersSearch.data)
  // }

  // console.log(data)

  const handleDelete = (user: IUser) => {
    deleteItem(user.id, DB_URL_USERS);
  }

  useEffect(() => {
    pagination(page, nextSize);
  }, [status, nextSize]);

  //console.log(usersShow)

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // const timerId = setTimeout(() => {
  //   console.log('Прошла секунда')
  // }, 1000)

  // clearTimeout(timerId)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //console.log(currentPage)



  // const scrollHandler = (e: any) => {
  //   console.log("scrollHandler>>>>", e.target.documentElement.scrollHeight)
  // console.log(e.deltaY)
  // let scrollHeight = e.target.documentElement.scrollHeight;
  // let scrollTop = e.target.documentElement.scrollTop;
  // let innerHeight = window.innerHeight;

  // if (scrollHeight - (scrollTop + innerHeight) < 500) {
  //   console.log("scroll >>>>>>", scrollHeight - (scrollTop + innerHeight));
  //   setNextPage(prev => prev + 1);
  // }



  // }

  // const wheelHandler = (e: any) => {
  //   if (e.deltaY > 0) {
  //     console.log(e.deltaY)
  //   }
  //   //console.log("wheelHandler>>>>", e)
  //   console.log(window.innerHeight);
  // }


  //console.log(nextPage, size * nextPage)



  // useEffect(() => {
  //   document.addEventListener("wheel", wheelHandler);
  //   document.addEventListener("scroll", scrollHandler);
  //   return function() {
  //     document.removeEventListener("wheel", wheelHandler);
  //     document.removeEventListener("scroll", scrollHandler);
  //   };
  // }, [])

  const searchHandler = (e: any) => {
    e.preventDefault();
    search(e.target[0].value, 1, 50)
    console.log(e.target[0].value)
  }

  //console.log(usersSearch.data)

  // const [err, setErr] = useState<string>('');
  let err = ''
  if (Object.keys(usersSearch)[0] === "error") {
    err = usersSearch.error;
  }




  return (
    <div className="container " >
      <Search searchHandler={searchHandler} />
      <h1>{loadingData}</h1>
      {loadingData && <Loader />}
      {errorDelete && <ErrorMesage error={errorDelete} />}
      {errorData && <ErrorMesage error={errorData} />}
      {err && <ErrorMesage error={err} />}
      <Table data={!usersSearch.data ? data : usersSearch.data} handleDelete={handleDelete} />
    </div>
  )
}

export default InfiniteScroll
