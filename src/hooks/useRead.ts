import { useState } from 'react';
import { IUser, IUserData } from "../models";
import { AxiosError } from 'axios';

interface IRead {
  users: IUser[];
  loading: boolean;
  error: string;
  readItm: (id: number, url: string) => void;
}

export function useRead(): IRead {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function readItm(id: number, url: string) {
    setLoading(true);
    setError('');

    await fetch(url + '/' + id)
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
        setError(e.message);
        console.error('There was an error!', e);
      })
    setLoading(false);
  }

  return { users, loading, error, readItm }
}