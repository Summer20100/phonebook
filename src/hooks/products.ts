import { useEffect, useState } from 'react';
import { IProduct } from '../models';
import { AxiosError } from 'axios';


export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function addProduct(product: IProduct) {
    setProducts(prev => [...prev, product])
  };

  async function fetchProducts() {
    try {
      setError('');
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, []);


  const [all, setAll] = useState([]);
  useEffect(() => {
    fetch('https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users/from=10&to=20')
      .then(res => res.json())
      .then(json => setAll(json))
  }, []);


  return { products, loading, error, addProduct }
}