import { useEffect, useState } from 'react';
import { IUser } from '../models';

interface IRead {
  id: number;
  url: string;
}

export function useRead(id: number, url: string) : IRead {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url + '/' + id)
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
      .catch(error => console.error('Error fetching data:', error));
  }, [url]);

  return { users, loading, error }
}