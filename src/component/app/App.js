import React, { Component, Fragment } from 'react';
import './App.css';
import '../menu/Titlebar.css';
import { Route, Switch, HashRouter, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Index from "../index/Index";
import Home from '../home/Home';
import Register from "../register/Register";
import Login from "../login/Login";
import VerifyLeague from "../verifyLeague/VerifyLeague";
import { InstallPWA } from "./InstallPWA";
import Titlebar from "../menu/Titlebar";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <HashRouter>
                    <div>
                        <Titlebar/>
                        <InstallPWA/>
                        <Switch>
                            <Route path="/" exact={true} component={Index}/>
                            <Route path='/home' exact={true} component={Home}/>
                            <Route path='/register' exact={true} component={Register}/>
                            <Route path='/login' exact={true} component={Login}/>
                            <Route path='/verifyLeague' exact={true} component={VerifyLeague}/>
                        </Switch>
                    </div>
                </HashRouter>
          </div>
      );
    }
}

export default App;
