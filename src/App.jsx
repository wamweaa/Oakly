import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import ProductContainer from './components/ProductContainer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import Contact from './components/Contanct';
import About from './components/About';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:itemId" element={<ProductContainer />} />
        <Route path="/product-container" element={<ProductContainer />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>}/>
        {/* Add more routes as needed */}
      </Routes>
      <Products/>
    </Router>
  );
}

export default App;
