import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { IProduct } from '../models';

interface ProductProps {
  product: IProduct;
  key: string
  ass: () => void
}

export function Product({key, product}: ProductProps) {
  const { ass } = useContext(ModalContext)
  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2" key={ key }>
      <img src={product.image} className="w-1/6" alt={product.title} onClick={ ass }/>
      <p>{product.title}</p>
      <span className="font-bold">{product.price}</span>
      <p>{product.description}</p>
    </div>
  )
}