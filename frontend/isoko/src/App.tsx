import React from 'react';
import Business from './pages/Business';
import BusinessDash from './pages/BusinessDash';
import Home from './pages/Home';
import ListBusiness from './pages/ListBusiness';
import Login from './pages/Login';
import ModDash from './pages/ModDash';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => 
   (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="business" element={<Business />} />
            <Route path="businessDash" element={<BusinessDash />} />
            <Route path="listBusiness" element={<ListBusiness />} />
            <Route path="moddash" element={<ModDash />} />
            <Route path="profile" element={<Profile />} />
         </Routes>
      </div>
   );

export default App;
