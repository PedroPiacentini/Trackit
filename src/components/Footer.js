import styled from "styled-components";
import React from "react";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Context from "./Context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Context2 from "./Context2";

export default function Footer() {
    const user = useContext(Context)[0];
    const percent = useContext(Context2)[0];

    return (

        <FooterContainer data-test="menu">
            <Link data-test="habit-link" to={"/habitos"}><p>Hábitos</p></Link>
            <ProgressBar>
                <Link to={"/hoje"}>
                    <span data-test="today-link">
                        <CircularProgressbar
                            value={percent}
                            text={"Hoje"}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#3e98c7",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                            })}
                        />
                    </span>
                </Link>
            </ProgressBar>
            <Link data-test="history-link" to={"/historico"}><p>Histórico</p></Link>

        </FooterContainer >
    )
}

const FooterContainer = styled.div`
    position: fixed;
    bottom: 0px;

    background-color: #FFFFFF;

    width: 100%;
    height: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 36px;
    a {
        text-decoration: none;
    }

    p {
    font-size: 18px;
    line-height: 22px;
    color: #52B6FF;
    }
`

const ProgressBar = styled.div`
    position: fixed;
    bottom: 10px;

    left: calc(50% - 91px / 2);
    width: 91px;
    height: 91px;

    span {
        font-family: 'Lexend Deca', sans-serif;
        
    }


`

