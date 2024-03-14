import { useEffect, useState } from 'react';
import { IUser } from '../models';
import { DB_URL_USERS } from "../data/_secret";

interface IDelete {
  id: number;
  url: string;
}

export function useDelete(id: number, url: string): IDelete {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  if (!id) {
    console.log("Add correction to ID");
  } else {
    useEffect(() => {
      fetch(url + '/' + id, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setStatus(`Delete successful ${id}`);
          console.log('Delete successful');
        })
        .catch(error => {
          setError(error);
          console.error('There was an error!', error);
        });
    }, [id]);
  }
  return { loading, error, status }
}