import React from "react";
import {handleRegister} from "../register/Util";

export const RegisterForm = ({registerRequested}) => {

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
            <div data-testid="register-form">
                <label htmlFor="email">Email</label>
                <input value={email} placeholder="email" onChange={handleChangeEmail}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" value={password} placeholder="password" onChange={handleChangePassword}/>
            </div>
            <p>{errorMessage}</p>
            <div>
                <button id="login-button" data-testid="register-button" onClick={() => handleRegister(email, password, registerRequested, handleErrorMessage)}>Login</button>
            </div>
        </div>
    )
}