import { Route, Routes } from 'react-router-dom'
import './App.css'
import AboutPage from './pages/AboutPage'
import ProductPages from './pages/ProductsPages'
import Naviagtion from './components/Navigation'
import Users from './pages/Users'
import Card from './components/Card'

export default function App() {
  return (
    <>
      <Naviagtion />
      <Routes>
        <Route path='/' element={ <ProductPages /> }/>
        <Route path='/about' element={ <AboutPage /> }/>
        <Route path='/users' element={ <Users /> }/>
        <Route path='/users/:id' element={ <Card /> }/>
      </Routes>
    </>
  )
}