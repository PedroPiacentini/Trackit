import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Context from "../../components/Context";
import check from "../../assets/check.png"

import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import Context2 from "../../components/Context2";


export default function Today() {
    const user = useContext(Context)[0];
    const [completeHabits, setCompleteHabits] = useContext(Context2);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const weekDay = days[dayjs().day()];
    const day = dayjs().date() >= 10 ? dayjs().date() : "0" + dayjs().date()
    const month = dayjs().month() >= 10 ? dayjs().month() : "0" + dayjs().month()
    const [habits, sethabits] = useState(null);
    function listHabits() {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
            .then(a => {
                let counter = 0;
                sethabits(a.data)
                const auxHabits = a.data;
                const habitPercent = auxHabits.length === 0 ? 0 : 100 / auxHabits.length
                auxHabits.map(habit => {
                    if (habit.done) counter++
                })
                setCompleteHabits(Math.floor(counter * habitPercent))
            })
            .catch(a => console.log(a.data));

    }
    function track(id) {
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config)
            .then(() => {
                listHabits()
            })
            .catch(a => {
                console.log(a)
            })
    }
    function unTrack(id) {
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config)
            .then(() => {
                listHabits()
            })
            .catch(a => console.log(a))
    }
    useEffect(listHabits, [])
    return (
        <TodayScreen>
            <Head />
            <h1 data-test="today">{`${weekDay}, ${day}/${month}`}</h1>
            <h2 data-test="today-counter">{
                completeHabits === 0 ?
                    "Nenhum hábito concluido ainda" :
                    `${Math.floor(completeHabits)}% dos hábitos concluidos`
            }</h2>
            {habits === null ? "" :
                habits.map(habit => {
                    const inRecord = habit.currentSequence === habit.highestSequence && habit.highestSequence !== 0
                    return (
                        <HabitContainer data-test="today-habit-container" key={habit.id} done={habit.done} >
                            <HabitText done={habit.done} inRecord={inRecord}>
                                <h1 data-test="today-habit-name">{habit.name}</h1>
                                <div>
                                    <h2 data-test="today-habit-sequence">Sequência: <span>{habit.currentSequence} dias</span></h2>
                                    <h2 data-test="today-habit-record">Seu recorde: <span>{habit.highestSequence} dias</span></h2>
                                </div>
                            </HabitText>
                            <button
                                data-test="today-habit-check-btn"
                                onClick={() => {
                                    habit.done ?
                                        unTrack(habit.id) :
                                        track(habit.id)
                                }
                                }><img src={check} /></button>
                        </HabitContainer>
                    )
                })}

            <Footer />
        </TodayScreen>
    )
}

const HabitText = styled.div`
    color: #666666;
    
    h1 {
        font-size: 20px;
        margin-top: 18px;
        margin-left: 15px;
    }
    h2 {
        font-size: 13px;
        margin-left: 15px;
    }
    >div {
        margin-top: 7px;
        margin-bottom: 17px;
    }
    >div :first-child span {
        color: ${props => props.done ? "#8FC549" : ""};
    }
    >div :last-child span {
        color: ${props => props.inRecord ? "#8FC549" : ""};
    }

`

const HabitContainer = styled.div`
    display: flex;
    width: 340px;
    min-height: 94px;
    background-color: #FFFFFF;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
    margin-bottom: 35px;
    border-radius: 5px;
    justify-content: space-between;

    button {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 13px;
        width: 69px;
        height: 69px;
        background-color: ${props => props.disableClick ?
        !props.done ? "#8FC549" : "#EBEBEB"
        :
        props.done ? "#8FC549" : "#EBEBEB"};
        border: ${props => props.done ? 0 : 1}px solid #E7E7E7;
        border-radius: 5px;
    }
`

const TodayScreen = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #F2F2F2;
    width: 100%;
    min-height: calc(100vh - 140px);
    height: calc(100%    - 70px); 

    margin-top: 70px;
    margin-bottom: 70px;    

    >h1 {
        font-size: 28px;    
        color: #126BA5;
        margin-top: 28px;
        margin-left: 17px;
    }
    >h2 {
        font-size: 18px;
        color: #BABABA;
        margin-top: 5px;
        margin-bottom: 43px;
        margin-left: 17px;
    }
`
