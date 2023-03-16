import { LoginScreen, Loading } from "./style";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";

export default function Login() {

    const [loginPost, setLoginPost] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    function handleLoginPost(e) {

        setLoginPost({
            ...loginPost,
            [e.target.name]: e.target.value
        })
    }

    function sendLogin(e) {

        e.preventDefault();
        setIsLoading(true);

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", loginPost)
        request.then(a => {
            console.log(a.value);
            setIsLoading(false);
        });
        request.catch(a => {
            console.log(a)
            setIsLoading(false);
        })
    }

    return (
        <LoginScreen isLoading={isLoading}>

            <img src={logo} alt="Logo Trackit" />

            <form onSubmit={sendLogin}>

                <input
                    type="email"
                    name="email"
                    onChange={handleLoginPost}
                    value={loginPost.email}
                    placeholder="email"
                    disabled={isLoading}
                />

                <input
                    type="password"
                    name="password"
                    onChange={handleLoginPost}
                    value={loginPost.password}
                    placeholder="senha"
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <Loading /> : "Entrar"}
                </button>


            </form>

            <p>Não tem uma conta? Cadastre-se!</p>

        </LoginScreen>
    )
}


