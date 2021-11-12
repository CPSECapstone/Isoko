import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import GlobalStyle from './styles/globalStyles';
import StyledButton from './styles/StyledButton';

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
         <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Comfortaa|Heebo|Open+Sans"
         />
         <GlobalStyle />
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div>
               <h1>ISOKO</h1>
               <h2>here's a header</h2>
               <a href="https://www.yelp.com/">sample link</a>
            </div>
            <div>
               <StyledButton primary>Primary</StyledButton>
               <StyledButton>Secondary</StyledButton>
            </div>

            <Counter />
            <p>
               Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <span>
               <span>Learn </span>
               <a
                  className="App-link"
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  React
               </a>
               <span>, </span>
               <a
                  className="App-link"
                  href="https://redux.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Redux
               </a>
               <span>, </span>
               <a
                  className="App-link"
                  href="https://redux-toolkit.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Redux Toolkit
               </a>
               ,<span> and </span>
               <a
                  className="App-link"
                  href="https://react-redux.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  React Redux
               </a>
            </span>
         </header>
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
