import styled from "styled-components";
import React from "react";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Footer() {
    return (
        <FooterContainer>
            <p>Hábitos</p>
            <ProgressBar>
                <span>
                    <CircularProgressbar
                        value={100}
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
            </ProgressBar>
            <p>Histórico</p>

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

