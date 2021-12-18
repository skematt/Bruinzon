import { API } from "../config"

export const createProduct = (userID, token, productName) => {
    return fetch(`${API}/product/create/${userID}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productName)

    })
    .then(response => {
        return response.json();
    })
    .catch(err => {console.log(err);
    })
}

export const createItem = (userID, token, item) => {
    return fetch(`${API}/item/create/${userID}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: item

    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err);
        })
}

export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err)});
}




export const getItems = () => {
    return fetch(`${API}/items?limit=undefined`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err)});
}

export const deleteProduct = (itemId, userId, token) =>{
    return fetch(`${API}/item/${itemId}/${userId}`,{
        method: "DELETE",
        headers:
        {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })

        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getItem = (productId) => {
    return fetch(`${API}/item/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err)});
}

export const updateItem = (itemId, userId, token, product) =>{
    return fetch(`${API}/item/${itemId}/${userId}`,{
        method: "PUT",
        headers:
        {
            Accept:"application/json",
            //"Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })

        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};





