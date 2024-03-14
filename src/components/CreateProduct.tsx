import { useState } from "react";
import { ErrorMesage } from "./ErrorMesage";
import { IProduct } from '../models';

const productData = {
  title: 'test product',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10
  }
};

interface CreateProductProps {
  onCreate: (product: IProduct) => void;
}

export function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (value.trim().length === 0) {
      setValue('');
      setError('Please enter a valid value');
      return
    }

    productData.title = value;

    await fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify(productData)
    })
      .then(res => res.json())
      //.then(json => console.log(json))
      .then(json => onCreate(productData))


    //onCreate();
  };

  const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title...."
        value={value}
        onChange={changeHandler}
      />
      {error && <ErrorMesage error={error} />}
      <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">
        Create
      </button>
    </form>
  )
}