import styled from "styled-components";

const LoginScreen = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    img {
        width: 180px;
        height: 180px;

        margin-top: 68px;
        margin-bottom: 27px;
    }
    input, button {
        width: 303px;
        height: 45px;

        margin-top: 6px;
        border-radius: 5px;
    }
    input {
        border: 1px solid #D4D4D4;  
        padding-left: 11px;
    }
    input::placeholder {
        font-size: 20px;
        color: #DBDBDB;
    }
    button {
        border: none;
        background-color: #52B6FF;
        padding-bottom: 4px;
        
        font-size: 21px;
        color: #FFFFFF;
    }
    p {
        width:232;
        height: 17px;

        margin-top: 25px;
        font-size: 14px;
        text-decoration: underline;
        color: #52B6FF;
    }
`
export default LoginScreen;
