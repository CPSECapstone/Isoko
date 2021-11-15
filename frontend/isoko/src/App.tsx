import React from 'react';
import GlobalStyle from './styles/globalStyles';
import Business from './pages/Business';
import BusinessDash from './pages/BusinessDash';
import Home from './pages/Home';
import ListBusiness from './pages/ListBusiness';
import Login from './pages/Login';
import ModDash from './pages/ModDash';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import StylesExample from './pages/StyleExample';
import { Routes, Route } from 'react-router-dom';

import './App.css';

const App = () => (
   <div className="App">
      <link
         rel="stylesheet"
         href="https://fonts.googleapis.com/css?family=Comfortaa|Heebo|Open+Sans"
      />
      <GlobalStyle />
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
         <Route path="styles" element={<StylesExample />} />
      </Routes>
   </div>
);

export default App;
