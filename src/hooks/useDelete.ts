import { useState } from 'react';
import { AxiosError } from 'axios';

interface IDelete {
  loading: boolean;
  error: string;
  status: string;
  deleteItem: (id: number, url: string) => void;
}

export function useDelete(): IDelete {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const deleteItem = (id: number, url: string) => {
    setLoading(true);
    setError('');
    setStatus({});

    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStatus(data);
        console.log(data);
      })
      .catch(error => {
        const e = error as AxiosError;
        setError(e.message);
        console.error('There was an error!', e);
      })
      setLoading(false);
  };

  return { loading, error, status, deleteItem };
}