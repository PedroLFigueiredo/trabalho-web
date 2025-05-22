import React from "react";
import cadastro from "./Cadastro"
import { Routes, Route, Link } from 'react-router-dom'

function Login(){
    return(
        <div className="Logindiv">
            <div className="login-container">
                <h1>Faça seu Login</h1>
                <form action="processa.php">
                    <label htmlFor="email">E-mail de Login</label>
                    <br /><br />
                    <input type="email" id="email" name="email"/>
                    <br /><br />
                    <label htmlFor="senha">Senha</label>
                    <br /><br />
                    <input type="password" id="senha" name="senha" />
                    <br /><br />
                    <button type="submit">Entrar</button>
                </form>
                <Link to="/cadastro">Cadastre-se</Link>
            </div>
        </div>
    );

}

export default Login;