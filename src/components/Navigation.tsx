import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="h-[50px] flex justify-between px-5 bg-gray-500 text-white items-center">
      <span className="font-bold">REACT-2024</span>
      
      <span>
        <NavLink to="/" className="mr-4">Products</NavLink>
        <NavLink to="/about"className="mr-4">About</NavLink>
        <NavLink to="/users"className="mr-4">Uers</NavLink>
      </span>
    </nav>
  )
}

export default Navigation;