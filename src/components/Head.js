import styled from "styled-components";
import logo from "../assets/logoTexto.png"
import Context from "./Context";
import { useContext } from "react";

export default function Head() {
    const image = useContext(Context)[0].image;
    return (
        <HeadContainer data-test="header">
            <Logo src={logo} />
            <User src={image} />
        </HeadContainer>
    )
}

const HeadContainer = styled.div`
    position: fixed;
    z-index: 1;
    top: 0px;

    height: 70px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #126BA5;
    box-shadow: 0px 4px 4px 0px #00000026;
`

const Logo = styled.img`
    width: 97px;
    height: 30px;
    margin-bottom: 1px;
    margin-left: 18px;
`

const User = styled.img`
    width: 51px;
    height: 51px;
    margin-right: 18px;
    border-radius: 98.5px;
`