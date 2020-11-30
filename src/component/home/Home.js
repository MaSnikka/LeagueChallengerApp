import '../home/Home.css';
import React, { Component } from 'react';
import { Card, ProgressBar, Container, Col, Row, Alert } from 'react-bootstrap';
import { renderCard } from "./DailyChallengeCard";

class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loadingDailyChallenges: false,
            dataDailyChallenges: null,
        };

        this.redirectVerifyLeague = this.redirectVerifyLeague.bind(this);
    }

    componentDidMount() {
        /**Check if League is verified**/
        console.log(localStorage.getItem("leagueId"));
        if(localStorage.getItem("leagueId") === "null" || localStorage.getItem("leagueId" === "undefined") || !localStorage.getItem("leagueId")){
            console.log("REEEEEEEDIRECT");
            this.redirectVerifyLeague();
        }

        this.getCurrentMatchData();
        this.getDailyChallenges();

        this.interval = setInterval(() => {
            this.getDailyChallenges();
            this.getCurrentMatchData();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getCurrentMatchData(){
        let url = new URL('http://localhost:8080/league/currentMatch')
        url.search = new URLSearchParams({
            leagueId: localStorage.getItem("leagueId")
        })

        fetch(url, {
            method: 'GET',

        })
            .then(result => result.json())
            .then(data => {
                console.log(data);
                if(data.state == 1){
                    this.setState({
                        dataCurrentMatch: data
                    })

                    localStorage.setItem("currentMatchId", data.match.gameId);

                    console.log(data.message);
                }else if(data.state == 0){
                    console.log(data.message);

                    this.setState({
                        dataCurrentMatch: null
                    })

                    if(localStorage.getItem("currentMatchId")){
                        //functie om waardes aan score van quest toe te voegen
                        localStorage.removeItem("currentMatchId");
                        console.log("Letsa go ik ga kills toevoegen");
                    }
                }
            });
    }

    redirectVerifyLeague(){
        this.props.history.push("/verifyLeague");
    }

    getDailyChallenges(){
        /**Get all playerChallenges**/
        fetch("http://localhost:8080/challenge/daily/" + localStorage.getItem("playerId"), {
            method: 'GET',
        })
            .then(result => result.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loadingDailyChallenges: true,
                    dataDailyChallenges: data
                })
            });
    }

    render() {

        const {dataDailyChallenges} = this.state;
        const{dataCurrentMatch} = this.state;

        if (this.state.loadingDailyChallenges) {
            return (
                <>
                    <div className="currentMatch w-100">
                        {dataCurrentMatch &&
                            <Alert variant={"primary"} className="currentMatchAlert text-center">
                                Currently in game: &nbsp;
                                <Alert.Link>{dataCurrentMatch.match.gameType}</Alert.Link>
                            </Alert>
                        }
                        {!dataCurrentMatch &&
                        <div>
                            <Alert variant={"danger"} className="currentMatchAlert text-center">
                                Currently not in game
                            </Alert>
                        </div>
                        }
                    </div>
                    <div className="class-content">
                        <h2>Daily challenges</h2>
                        <Container>
                            <Row className="justify-content-md-center">
                                {dataDailyChallenges.map(renderCard)}
                            </Row>
                        </Container>
                    </div>
                </>
            );
        }else{
            return(
              <div>
                  hoi
              </div>
            );
        }
    }
}

export default Home;