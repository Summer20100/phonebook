import { useEffect, useState } from 'react';

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
    setStatus('');

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
        setStatus(`Delete successful ${id}`);
        console.log('Delete successful');
      })
      .catch(error => {
        setError(error.message);
        console.error('There was an error!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, error, status, deleteItem };
}