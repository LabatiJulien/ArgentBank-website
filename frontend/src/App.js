import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import User from './pages/user/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path="/profile" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
