import { API_BASE_URL } from "./constant";

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem("ACCESS_TOKEN")) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("ACCESS_TOKEN"))
        
    }
    
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);
    
    return fetch(options.url, options)   //ajax call
        .then(response =>
            response.json()

        .then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};



export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "accounts/api/token/",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(loginRequest) {
    return request({
        url: API_BASE_URL + "accounts/register/",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function current_user() {
    return request({
        url: API_BASE_URL + "accounts/current-user/",
        method: 'GET',  
    });
}

export function password_reset(loginRequest) {
    return request({
        url: API_BASE_URL + "accounts/reset-password-email/",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

//Forgot Password
export function newPassword(loginRequest) {
    return request({
        url: API_BASE_URL + "accounts/reset-password-confirm/",
        method: 'PATCH',
        body: JSON.stringify(loginRequest)
    });
}

export function verifyEmail() {
    return request({
        url: API_BASE_URL + "accounts/email-verify/",
        method: 'GET',  
    });
}


