import LoginScreen from "./style";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";

export default function Login() {

    const [loginPost, setLoginPost] = useState({
        email: "",
        password: ""
    });

    function handleLoginPost(e) {

        setLoginPost({
            ...loginPost,
            [e.target.name]: e.target.value
        })
        console.log(loginPost);
    }

    function sendLogin(e) {

        e.preventDefault();

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", loginPost)
        request.then(a => console.log(a.value));
        request.catch(a => console.log(a))
    }

    return (
        <LoginScreen>

            <img src={logo} alt="Logo Trackit" />

            <form onSubmit={sendLogin}>

                <input
                    type="email"
                    name="email"
                    onChange={handleLoginPost}
                    value={loginPost.email}
                    placeholder="email"

                />

                <input
                    type="password"
                    name="password"
                    onChange={handleLoginPost}
                    value={loginPost.password}
                    placeholder="senha"
                />

                <button type="submit">Entrar</button>

            </form>

            <p>Não tem uma conta? Cadastre-se!</p>

        </LoginScreen>
    )
}


