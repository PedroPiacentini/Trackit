import Footer from "../../components/Footer";
import Head from "../../components/Head";
import styled from "styled-components";

export default function Historic() {
    return (
        <>
            <Head />
            <HistoricScreen>
                <h1>Histórico</h1>
                <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
            </HistoricScreen>
            < Footer />
        </>
    )
}

const HistoricScreen = styled.div`
    display: flex;
    flex-direction: column;

    background-color: #F2F2F2;
    width: 100%;
    min-height: calc(100vh - 140px);
    height: calc(100%    - 70px); 

    margin-top: 70px;
    margin-bottom: 70px;

    h1 {
        margin-top: 28px;
        margin-left: 17px;
        color: #126BA5;
        font-size: 23px;
    }
    h2 {
        margin-top: 17px;
        margin-left: 15px;
        line-height: 25px;
        color: #666666;
        font-size: 18px;
    }
`