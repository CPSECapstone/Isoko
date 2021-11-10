import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import GlobalStyle from './styles/globalStyles';
import StyledButton from './styles/StyledButton';
import './App.css';

function App() {
   return (
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
      </div>
   );
}

export default App;
