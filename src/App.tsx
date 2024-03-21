import { Route, Routes } from 'react-router-dom'
import './App.css'
import AboutPage from './pages/AboutPage'
import ProductPages from './pages/ProductsPages'
import Naviagtion from './components/Navigation'
import Users from './pages/Users'
import Card from './components/Card'
import InfiniteScroll from './pages/InfiniteScroll';

export default function App() {
  return (
    <>
      <Naviagtion />
        <div className='mt-[75px]'>
          <Routes>
            <Route path='/' element={ <ProductPages /> }/>
            <Route path='/about' element={ <AboutPage /> }/>
            <Route path='/users' element={ <Users /> }/>
            <Route path='/users/:id' element={ <Card /> }/>
            <Route path='/scroll' element={ <InfiniteScroll /> }/>
          </Routes>
        </div>
    </>
  )
}