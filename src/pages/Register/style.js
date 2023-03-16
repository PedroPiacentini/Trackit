import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner'

const Loading = () => {
    return (
        <ThreeDots
            height="13"
            width="51"
            radius="9"
            color="#FFFFFF"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    )

}



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
        border: 1px solid ${props => props.isLoading ? "#F2F2F2" : "#D4D4D4"};  
        color: ${props => props.isLoading ? "#AFAFAF" : ""};  
        padding-left: 11px;
        font-size: 20px;
    }
    input::placeholder {
        color: #DBDBDB;
    }
    button {
        border: none;
        background-color: #52B6FF;  
        opacity: ${props => props.isLoading ? 0.7 : ""}; 

        display: flex;
        justify-content: center;
        align-items: center;
        
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
export { LoginScreen, Loading };
