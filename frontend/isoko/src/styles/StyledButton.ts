import styled, { StyledFunction } from 'styled-components'; 

type ButtonProps = {primary: boolean}


//const button: StyledFunction<buttonProps & React.HTMLProps<HTMLButtonElement>> = styled.button

const StyledButton = styled.button<ButtonProps>`
    background: ${(props: { primary: any; }) => props.primary ? "#F97D0B" : "white"}; 
    color: ${(props: { primary: any; }) => props.primary ? "white" : "#F97D0B"}; 
    box-shadow: ${(props: { primary: any; }) => props.primary ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : 
        "0px 0px 1px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.11)"};
    font-size: 0.75em; 
    font-family: Open Sans;
    padding: 8px 16px; 
    border-radius: 10px;
    border: none; 
`; 

export default StyledButton; 