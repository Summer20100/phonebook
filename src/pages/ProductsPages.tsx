import { useProducts } from '../hooks/products';
import { Product } from '../components/Product';
import { Loader } from '../components/Loader';
import { ErrorMesage } from '../components/ErrorMesage';
import { Modal } from '../components/Modal';
import { CreateProduct } from '../components/CreateProduct';
import { useContext } from 'react';
import { IProduct } from '../models';
import { ModalContext } from '../context/ModalContext';

function ProductPages() {


  const { products, loading, error, addProduct } = useProducts();
  //const [modal, setModal] = useState(false);

  const { modal, open, close } = useContext(ModalContext);

  const createHandler = (product: IProduct) => {
    // setModal(false);
    close();
    addProduct(product);
  }

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <ErrorMesage error={error} />}
      {
        products.map(product => <Product key={product.id} product={product} />)
      }

      <button 
        className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
        onClick={ open }
      >+</button>

      {modal && <Modal title="Create new product" onClose={ close }>
        <CreateProduct onCreate={ createHandler } />
      </Modal>
      }

    </div>
  )




  
}

export default ProductPages