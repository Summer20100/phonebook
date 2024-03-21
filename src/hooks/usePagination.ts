import { useEffect, useState } from 'react';
import { IUser, IUserData } from "../models";
import { AxiosError } from 'axios';
import { DB_URL_USERS } from "../data/_secret";

interface IPagination {
  users: IUserData[];
  loading: boolean;
  error: string;
  pagination: (page: number, size: number) => void;
}

export function usePagination(): IPagination {

  const [users, setUsers] = useState<IUserData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function pagination(page: number, size: number) {
    setError('');
    setLoading(true);

    fetch(`${DB_URL_USERS}?page=${page}&size=${size}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          console.log('Empty data received');
        } else {
          setUsers(data);
        }
      })
      .catch(error => {
        const e = error as AxiosError;
        console.error('Error fetching data:', e)
      })
    setLoading(false);
  }

  return { users, loading, error, pagination }
}