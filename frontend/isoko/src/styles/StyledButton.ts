import styled from 'styled-components'; 

interface ButtonProps {
    primary?: boolean
}

const StyledButton = styled.button<ButtonProps>`
    background: ${props => props.primary ? "#F97D0B" : "white"}; 
    color: ${props => props.primary ? "white" : "#F97D0B"}; 
    box-shadow: ${props => props.primary ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : 
        "0px 0px 1px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.11)"};
    font-size: 0.75em; 
    font-family: Open Sans;
    padding: 8px 16px; 
    border-radius: 10px;
    border: none; 
`; 

export default StyledButton; 