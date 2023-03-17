import Footer from "../../components/Footer";
import Head from "../../components/Head";

import styled from "styled-components";

export default function Today() {
    return (
        <TodayScreen>
            <Head />
            <div className="capeta">ois</div>
            <Footer />
        </TodayScreen>
    )
}

const TodayScreen = styled.div`
    display: flex;
    background-color: #F2F2F2;
    width: 100%;
    min-height: calc(100vh - 140px);
    height: calc(100%    - 70px); 

    margin-top: 70px;
    margin-bottom: 70px;

    .capeta {
        height: 200px;
    }
`