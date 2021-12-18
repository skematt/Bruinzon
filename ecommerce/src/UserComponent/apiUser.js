import { API } from "../config";

export const read = (userID, token) => {
    return fetch(`${API}/userdata/${userID}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (userID, token, user) => {
    return fetch(`${API}/userdata/${userID}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err=>console.log(err));
}

export const updateUser = (user, next) => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'));
            console.log(auth)
            console.log(user)
            auth.customer = user;
            localStorage.setItem('jwt', JSON.stringify(auth));
            next()
        }
    }
}