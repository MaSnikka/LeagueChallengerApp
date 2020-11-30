import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import {withRouter} from "react-router-dom";
import LoginForm from "./LoginForm";

class Login extends Component {

    constructor(props) {
        super(props);
    }

    handleRedirect = () => {
        this.props.history.push("/home");
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm loginRequested={this.handleRedirect}/>
            </div>
        )
    }
}

export default withRouter(Login);
