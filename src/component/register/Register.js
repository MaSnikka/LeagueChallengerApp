import React, {Component} from 'react'
import { RegisterForm } from "./RegisterForm";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        }
    }

    handleRedirect = () => {
        //this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <RegisterForm registerRequested={this.handleRedirect}/>
            </div>
        )
    }
}

export default Register;
