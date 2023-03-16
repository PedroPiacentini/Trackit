import { LoginScreen, Loading } from "./style";
import logo from "../../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [loginPost, setLoginPost] = useState({
        email: "",
        password: "",
        name: "",
        image: ""
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

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", loginPost)
        request.then(a => {
            setIsLoading(false);
            navigate("/");
        });
        request.catch(a => {
            setIsLoading(false);
            alert(a.response.data.message);
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

                <input
                    type="text"
                    name="name"
                    onChange={handleLoginPost}
                    value={loginPost.name}
                    placeholder="nome"
                    disabled={isLoading}
                />

                <input
                    type="url"
                    name="image"
                    onChange={handleLoginPost}
                    value={loginPost.image}
                    placeholder="foto"
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <Loading /> : "Cadastrar"}
                </button>


            </form>

            <Link to={"/"}>
                <p>Já tem uma conta? Faça login!</p>
            </Link>

        </LoginScreen>
    )
}


