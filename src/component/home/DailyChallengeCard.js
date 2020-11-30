import {Card, Col, ProgressBar} from "react-bootstrap";
import Sword from "./images/Sword.png";
import Hand from "./images/Hand.jpg";
import * as GrIcons from "react-icons/gr";
import * as GiIcons from "react-icons/gi";
import React from "react";

export const renderCard = (challenge, index) => {

    console.log(challenge);

    let image = challenge.challengeDaily.imageUrl
    let title = challenge.challengeDaily.title
    let goal = challenge.challengeDaily.goal
    let rewardGold = challenge.challengeDaily.rewardDaily.rewardGold
    let rewardRank = challenge.challengeDaily.rewardDaily.rewardRank
    let score = challenge.score

    console.log(index);
    return(
        <Col lg={3}>
            <Card key={index} className="box">
                {image === "Sword" && <Card.Img className="challenge-image" variant="top" src={Sword} />}
                {image === "Hand" && <Card.Img className="challenge-image" variant="top" src={Hand} />}
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <div className="row">
                            <div className="col">
                                <GrIcons.GrMoney className="goldIcon"/> {rewardGold}
                            </div>
                            <div className="col">
                                <GiIcons.GiRank3 className="rankIcon"/> {rewardRank}
                            </div>
                        </div>
                        <div>
                            <ProgressBar now={score} label={score} max={goal}/>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}