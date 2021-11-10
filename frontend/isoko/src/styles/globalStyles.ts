import { createGlobalStyle } from 'styled-components';
import device from './devices';

const GlobalStyle = createGlobalStyle`
a {
    color: #0645AD; 
    font-family: Open Sans; 
    font-size: 0.75rem;
}
body {
    background: #E5E5E5; 
    font-family: Open Sans; 
    font-size: 0.75rem;  
}
div {
    display: flex; 
    flex-direction: row; 

    @media ${device.mobile} {
        flex-direction: column; 
    }

    font-family: Open Sans; 
    font-size: 0.75rem; 
    padding: 10px; 
    margin: 10px; 
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
