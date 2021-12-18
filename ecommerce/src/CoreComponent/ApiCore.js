import { API } from "../config"
import queryString from "query-string"


export const getProducts = sortBy => {
    return fetch(`${API}/items?sortBy=${sortBy}&order=desc&limit=2`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err)});
};

export const getProductTypes = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err)});
}


export const filterItem = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }
    return fetch(`${API}/items/by/search`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify(data)

    })
    .then(response => {
        return response.json();
    })
    .catch(err => {console.log(err);
    })
}


export const list = (params) => {
    const query = queryString.stringify(params)
    return fetch(`${API}/items/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err)});
};


export const read = (productId) => {
    return fetch(`${API}/item/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err)});
}

export const listRelated = (productId) => {
    return fetch(`${API}/items/related/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err)});
}