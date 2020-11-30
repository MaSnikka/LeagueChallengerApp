import React from "react";

const axios = require('axios');

export const fetchProfilePicture = (username, handleErrorMessage) => {

    if (username) {
        return axios
            .get('http://localhost:8080/league/summoners/' + username)
            .then(response => response.status === 200 ? response : Promise.reject)
            .then(response => {

                console.log(response);

                return response.data;
            })
            .catch(error => {
                console.log(error.response);

                handleErrorMessage(error.response.data.message);

                return error.response;
            });
    }else{
        let errorMessage = { message: "Username missing"};
        handleErrorMessage(errorMessage.message);
        return errorMessage;
    }
}

export const verifyLeague = (playerId, username, handleErrorMessage) => {
    return axios
        .post('http://localhost:8080/league/verifyLeague/' + playerId + '/' + username)
        .then(response => response.status === 200 ? response : Promise.reject)
        .then(response => {

            console.log(response);

            return response.data;
        })
        .catch(error => {
            console.log(error.response);

            handleErrorMessage(error.response.data.message);

            return error.response;
        });
}