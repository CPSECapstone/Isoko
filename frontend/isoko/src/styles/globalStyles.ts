import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
a {
    color: #0645AD; 
    font-family: Open Sans; 
}
a:hover {
  color: #00368c;
  cursor: pointer;
}
body {
    background: #E5E5E5; 
    font-family: Open Sans; 
    font-size: 0.75rem;  
}
div {
    font-family: Open Sans; 
    font-size: 0.75rem; 
}
h1 {
    font-family: Comfortaa, sans-serif; 
    font-size: 1.5rem; 
}
h2 {
    font-family: Heebo, sans-serif; 
    font-weight: 500; 
    font-size: 1rem; 
}`;

export default GlobalStyle;
