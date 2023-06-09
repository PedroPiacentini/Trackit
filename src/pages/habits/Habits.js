import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Context from "../../components/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import trash from "../../assets/lixo.png"
import { Loading } from "./style";

import styled from "styled-components";
import { useContext } from "react";


export default function Habits() {
    const user = useContext(Context)[0];
    const [habits, sethabits] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [newHabit, setNewHabit] = useState({
        name: "",
        days: []
    })
    const [isLoading, setIsLoading] = useState(false);

    function handleNewHabit(e) {
        setNewHabit({
            ...newHabit,
            [e.target.name]: e.target.value
        })
    }
    function sendHabit() {
        setIsLoading(true);
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", newHabit, config)
        request.then(a => {
            listHabits();
            setNewHabit({
                name: "",
                days: []
            });
            setOpenCreate(false);
            setIsLoading(false);
        });
        request.catch(a => {
            alert(a.response.data.message)
            setIsLoading(false);
        })
    }


    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    const days = ["D", "S", "T", "Q", "Q", "S", "S"]

    function listHabits() {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
            .then(a => sethabits(a.data))
            .catch(a => console.log(a.data));
    }
    function deleteHabit(habitId) {
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}`, config)
            .then(listHabits)
            .catch(a => console.log(a));
    }

    useEffect(listHabits, [])

    return (
        <HabtisScreen>

            <Head />

            <TopMenu>
                <p>Meus hábitos</p>
                <button data-test="habit-create-btn" onClick={() => setOpenCreate(true)}><span>+</span></button>
            </TopMenu>
            {openCreate ?
                <CreateContainer data-test="habit-create-container" isLoading={isLoading}>
                    <textarea
                        data-test="habit-name-input"
                        onChange={handleNewHabit}
                        value={newHabit.name}
                        disabled={isLoading}
                        placeholder="nome do hábito"
                        name="name"
                    />
                    <DaysContainer>
                        {
                            days.map((day, i) => {
                                const selectedDays = newHabit.days
                                let selected = false;
                                selectedDays.map(selectedDay => {
                                    if (i === selectedDay) {
                                        selected = true;
                                    }
                                })
                                return (
                                    <Day
                                        data-test="habit-day"
                                        key={i}
                                        onClick={() => {
                                            if (isLoading) return;
                                            if (selected) {
                                                const index = selectedDays.indexOf(i);
                                                const newSelectedDays = [...selectedDays];
                                                newSelectedDays.splice(index, 1);
                                                setNewHabit({
                                                    ...newHabit,
                                                    days: newSelectedDays
                                                });
                                            } else {
                                                setNewHabit({
                                                    ...newHabit,
                                                    days: [...selectedDays, i]
                                                });
                                            }
                                        }}
                                        disabled={isLoading}
                                        selected={selected}
                                    >
                                        <p disabled={isLoading}>{day}</p>
                                    </Day>
                                );
                            })
                        }
                    </DaysContainer>
                    <div>
                        <p data-test="habit-create-cancel-btn" onClick={() => {
                            if (isLoading) return;
                            setOpenCreate(false)
                        }}
                        >Cancelar</p>
                        <button data-test="habit-create-save-btn" disabled={isLoading} onClick={sendHabit}><span>{isLoading ? <Loading /> : "salvar"}</span></button>
                    </div>
                </CreateContainer>
                :
                ""
            }


            <HabitsContainer>

                {habits === null ? <p>carregando...</p>
                    : habits.length === 0 ?
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                        :
                        habits.map(habit => {
                            return (
                                <div data-test="habit-container" key={habit.id}>
                                    <img
                                        data-test="habit-delete-btn"
                                        src={trash}
                                        onClick={() => {
                                            const isDelete = window.confirm("Tem certeza?");
                                            isDelete ?
                                                deleteHabit(habit.id)
                                                :
                                                console.log("")
                                        }}
                                    />
                                    <p data-test="habit-name">{habit.name}</p>
                                    <DaysContainer>
                                        {
                                            days.map((day, i) => {
                                                let selected = false;
                                                habit.days.map(day => {
                                                    if (i === day) {
                                                        selected = true;
                                                    }
                                                })
                                                return (
                                                    <Day data-test="habit-day" key={habit.id + i} selected={selected}><p>{day}</p></Day>
                                                );
                                            })
                                        }
                                    </DaysContainer>
                                </div>
                            );
                        })
                }

            </HabitsContainer>

            <Footer />

        </HabtisScreen >
    )
}

const DaysContainer = styled.div`
    width: 234px;

    height: 30px;

    display: flex;
    justify-content: space-between; 
`
const CreateContainer = styled.div`
    width: 340px;
    min-height: 180px;
    border-radius: 5px;
    margin-top: 20px;
    background-color: #FFFFFF;

    display: flex;
    flex-direction: column;
    padding: 15px;
    textarea {
        resize: none;

        width: 303px;
        height: 45px;
        margin-bottom: 8px;
        margin-top: 3px;
        background-color: ${props => props.isLoading ? "#F2F2F2" : "#FFFFFF"};

        border: 1px solid #D5D5D5;
        border-radius: 5px;

        font-size: 20px;
        line-height: 25px;  
        padding-top: 9px;
        padding-left: 11px;

        color: ${props => props.isLoading ? "#B3B3B3" : "#666666"};

        ::placeholder {
            font-size: 20px;
            line-height: 25px;
            color: #DBDBDB;
        }
    }
    >:nth-child(3){
        margin-top: 30px;
        margin-left: 135px;
        width: 176px;
        height: 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        opacity: ${props => props.isLoading ? 0.7 : ""};

        p, button{
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color:#52B6FF;
        }
        button {
            border: none;
            width: 84px;
            height: 35px;
            border-radius: 4.6px;
            background-color: #52B6FF;
            color: #FFFFFF;
        }
    }
`

const Day = styled.div`
    width: 30px;
    height: 30px;

    border: 1px solid #D5D5D5;
    border-radius: 5px;
    border-color: ${props => props.selected ? "#CFCFCF" : "#D4D4D4"};
    background-color: ${props => props.selected ? "#CFCFCF" : ""};

    padding-top: 4px;

    display: flex;
    justify-content: center;

    font-size: 20px;
    color: ${props => props.selected ? "#FFFFFF" : "#DBDBDB"};
`
const HabitsContainer = styled.div`
    width: 340px;
    margin-top: 20px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;

    color: #666666;

    >div {
        position: relative;

        background-color: #FFFFFF;
        margin-bottom: 15px;
        border-radius: 5px;
        padding: 15px;

        p{
            margin-bottom: 8px;
        }
    }

    >p{
        font-size: 17.976px;
        margin-top: 28px;
    }

    img {
        position: absolute;
        top: 11px;
        right: 10px;
    }
`
const TopMenu = styled.div`
    width: 100%;
    height: 34px;

    margin-top: 21px;

    padding: 0px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p{
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    >button {
        width: 40px;
        height: 35px;
        border: none;

        border-radius: 4.6px;
        background-color: #52B6FF;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 26.976px;
        text-align: center;
        color: #FFFFFF;
    }
`
const HabtisScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #F2F2F2;
    width: 100%;
    min-height: calc(100vh - 140px);
    height: calc(100%    - 70px); 

    margin-top: 70px;
    margin-bottom: 70px;
`