import React, {Component} from 'react'
import { Image } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { withRouter, Redirect } from "react-router-dom";

import { fetchProfilePicture, verifyLeague } from "./Util";

class VerifyLeague extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameGiven: false,
            username: null,
            currentProfileIconId: null
        };

        this.redirectHome = this.redirectHome.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleErrorMessage = this.handleErrorMessage.bind(this);
    }

    handleErrorMessage(message){
        this.setState({
            errorMessage: message
        })
    }

    verifyProfilePicture(){
        const {username} = this.state;

        fetchProfilePicture(username, this.handleErrorMessage).then(data => {
            if(data.summoner && data.summoner.profileIconId === 1){
                verifyLeague(localStorage.getItem("playerId"), username, this.handleErrorMessage).then(data => {
                    if(data.leagueId){
                        localStorage.setItem("leagueId", data.leagueId);
                        localStorage.setItem("accountId", data.accountId);
                        localStorage.setItem("puuid", data.puuid);

                        Swal.fire(
                            'Verified!',
                            'Now you can earn rewards',
                            'success'
                        ).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                this.redirectHome();
                            }
                        })
                    }
                })
            }else{
                this.setState({
                    currentProfileIconId: data.summoner.profileIconId,
                    usernameGiven: true
                })
                this.handleErrorMessage("Profile picture does not match required one")
            }
        })
    }

    redirectHome(){
        this.props.history.push("/home");
    }

    handleChangeUsername(event){
        this.setState({
            username: event.target.value
        })
    }

    handleSubmit(){
        const {username} = this.state;

        if(username){
            fetchProfilePicture(username, this.handleErrorMessage).then(data => {
                console.log(data);
                if(data.summoner){
                    console.log("yayeet");
                    this.setState({
                        currentProfileIconId: data.summoner.profileIconId,
                        usernameGiven: true
                    })
                }
            });
        }
    }


    render() {

        const {usernameGiven} = this.state;
        const {username} = this.state;
        const {currentProfileIconId} = this.state;
        const {errorMessage} = this.state;

        if(!usernameGiven){
            return (
                <div>
                    <h1>Hier moet je je league account verifyen</h1>
                    <div>
                        <label htmlFor="email">League Of Legends IGN: &nbsp;</label>
                        <input placeholder="Destroyer2000..." type="text" name="username" id="username" onChange={this.handleChangeUsername}/>
                        <div>
                            {errorMessage}
                        </div>
                    </div>
                    <div>
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            )
        }

        if(usernameGiven && currentProfileIconId !== null){

            let currentProfilePictureUrl = "http://ddragon.leagueoflegends.com/cdn/10.15.1/img/profileicon/" + currentProfileIconId + ".png";

            return(
                <div>
                    <a>Current profile icon: <Image src={currentProfilePictureUrl} thumbnail />, Change your current profile icon to: <Image src="http://ddragon.leagueoflegends.com/cdn/10.15.1/img/profileicon/1.png" thumbnail />. After you changed it. Click on the verify button</a>
                    <p className="text-danger">{errorMessage}</p>
                    <button onClick={() => this.verifyProfilePicture()}>Verify</button>
                </div>
            )
        }
    }
}

export default withRouter(VerifyLeague);