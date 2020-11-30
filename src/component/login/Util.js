const axios = require('axios');

const handleSubmit = (email, password, loginRequested, handleErrorMessage) => {
    if (email && password) {
        let formData = new URLSearchParams();

        formData.append('email', email)
        formData.append('password', password);

        return axios
            .post('http://localhost:8080/account/login', formData)
            .then(response => response.status === 200 ? response : Promise.reject)
            .then(response => {

                console.log(response);

                localStorage.setItem('playerId', response.data.player.id);

                if(response.data.player.leagueId){
                    localStorage.setItem('leagueId', response.data.player.leagueId);
                    localStorage.setItem('accountId', response.data.player.accountId);
                    localStorage.setItem('puuid', response.data.player.puuid);
                }

                loginRequested();

                return response.data;
            })
            .catch(error => {
                console.log(error.response);

                handleErrorMessage(error.response.data.message);

                return error.response;
            });
    }else{
        return { message: "Required fields need input"};
    }
}

exports.handleSubmit = handleSubmit;