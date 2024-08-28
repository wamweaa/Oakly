import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className='nav-contents'>
      <div className='navbar'>
        {/* Add Logo if needed */}
        <ul className='navbar-list'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li className='drop-down'>
            Furniture
            <div className='dropdown-content'>
              <Link to="/chairs">Chairs</Link>
              <Link to="/tables">Tables</Link>
              <Link to="/beds">Beds</Link>
              <Link to="/tv-sets">TV-sets</Link>
              <Link to="/sofa-sets">Sofa-sets</Link>
            </div>
          </li>
          <li><Link to="/materials">Materials</Link></li>
          <li className='user-dropdown'>
            <Link to="/profile"><FaRegUser /></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
