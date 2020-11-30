import React, {Component} from "react";
import { handleSubmit } from "./Util";

export const LoginForm = ({loginRequested}) => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
    }

    return (
        <div>
            <div data-testid="login-form">
                <label htmlFor="email">Email</label>
                <input value={email} placeholder="email" onChange={handleChangeEmail}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" value={password} placeholder="password" onChange={handleChangePassword}/>
            </div>
            <p>{errorMessage}</p>
            <div>
                <button id="login-button" data-testid="login-button" onClick={() => handleSubmit(email, password, loginRequested, handleErrorMessage)}>Login</button>
            </div>
        </div>
    )
};

export default LoginForm;
