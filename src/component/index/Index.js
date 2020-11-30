import React, {Component} from 'react'
import { Redirect, Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";
import {  Button } from "react-bootstrap";


class Index extends Component {
    render() {
        return (
            <div>
                <h1>Dit is een onepager reclame</h1>

                <div className="mb-2">
                    <Link to="/register">
                        <Button data-testid="button-getStarted" variant="outline-primary" size="lg">
                            Get started!
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline-secondary" size="lg">
                            Already have an account?
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Index);
