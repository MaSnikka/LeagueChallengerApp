const axios = require('axios');

export const handleRegister = (email, password, registerRequested, handleErrorMessage) => {
    if(email && password) {
        let formData = new URLSearchParams();
        formData.append('email', email)
        formData.append('password', password);

        return axios
            .post("http://localhost:8080/account/register", formData).then(response => response.status === 200 ? response : Promise.reject)
            .then(response => {

                console.log(response);

                registerRequested();

                return response.data;
            })
            .catch(error => {
                console.log(error.response);

                handleErrorMessage(error.response.data.message);

                return error.response;
            });
    }else{
        let errorMessage = { message: "Required fields need input"};
        handleErrorMessage(errorMessage.message);
        return errorMessage;
    }
}