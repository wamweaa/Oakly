import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
// import UserProfile from './components/UserProfile';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}
