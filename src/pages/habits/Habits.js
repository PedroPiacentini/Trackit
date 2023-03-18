import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Context from "../../components/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import trash from "../../assets/lixo.png"

import styled from "styled-components";
import { useContext } from "react";


export default function Habits() {
    const user = useContext(Context)[0];
    const [habits, sethabits] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);

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
    console.log(habits)

    return (
        <TodayScreen>

            <Head />

            <TopMenu>
                <p>Meus hábitos</p>
                <button onClick={() => setOpenCreate(true)}><span>+</span></button>
            </TopMenu>
            {openCreate ?
                <CreateContainer>
                    <textarea placeholder="nome do hábito" />
                    <DaysContainer>
                        {
                            days.map((day) => {
                                return (
                                    <Day><p>{day}</p></Day>
                                );
                            })
                        }
                    </DaysContainer>
                    <div>
                        <p onClick={() => setOpenCreate(false)}>Cancelar</p>
                        <button><span>Salvar</span></button>
                    </div>
                </CreateContainer>
                :
                <div></div>
            }


            <HabitsContainer>

                {habits === null ? <p>carregando...</p>
                    : habits.length === 0 ?
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                        :
                        habits.map(habit => {
                            let j = 0;
                            return (
                                <div key={habit.id}>
                                    <img
                                        src={trash}
                                        onClick={() => {
                                            const isDelete = window.confirm("Tem certeza?");
                                            isDelete ?
                                                deleteHabit(habit.id)
                                                :
                                                console.log("não")
                                        }}
                                    />
                                    <p>{habit.name}</p>
                                    <DaysContainer>
                                        {
                                            days.map((day, i) => {
                                                let selected = false;
                                                if (i === habit.days[j]) {
                                                    selected = true;
                                                    j++
                                                }
                                                return (
                                                    <Day key={habit.id + i} selected={selected}><p>{day}</p></Day>
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

        </TodayScreen>
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

        border: 1px solid #D5D5D5;
        border-radius: 5px;

        font-size: 20px;
        line-height: 25px;  
        padding-top: 9px;
        padding-left: 11px;

        color: #666666;

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

        p, button{
            font-size: 16px;
            line-height: 20px;
            text-align: center;
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
const TodayScreen = styled.div`
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